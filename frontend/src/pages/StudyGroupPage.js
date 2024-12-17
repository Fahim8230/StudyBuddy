import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import MessagesComponent from "../components/MessagesComponent";
import MeetingsComponent from "../components/MeetingsComponent";
import AttachmentsComponent from "../components/AttachmentsComponent";

const StudyGroupPage = () => {
    const { groupId } = useParams();
    const [studyGroup, setStudyGroup] = useState(null);
    const { getToken, isAuthenticated, authChecked } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authChecked) {
            return;
        }
        const fetchStudyGroup = async () => {
            try {
                const token = await getToken();
                const response = await axios.get(
                    `http://127.0.0.1:5000/study-groups/${groupId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setStudyGroup(response.data);
            } catch (error) {
                console.error("Error fetching study group:", error);
            }
        };
        if (isAuthenticated) {
            fetchStudyGroup();
        } else {
            navigate("/login");
        }
    }, [groupId, getToken, isAuthenticated, navigate, authChecked]);

    if (!studyGroup) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Tab.Container defaultActiveKey="messages">
                    <Col md={3}>
                        <h2 className="mb-4 text-center">{studyGroup.name}</h2>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="messages">
                                    Messages
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="meetings">
                                    Meetings
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="attachments">
                                    Attachments
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col md={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="messages">
                                <MessagesComponent studyGroup={studyGroup} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="meetings">
                                <MeetingsComponent studyGroup={studyGroup} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="attachments">
                                <AttachmentsComponent studyGroup={studyGroup} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Tab.Container>
            </Row>
        </Container>
    );
};

export default StudyGroupPage;
