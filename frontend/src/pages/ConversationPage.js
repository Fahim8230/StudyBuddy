import React, { useEffect, useState, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import MessagesComponent from "../components/MessagesComponent";
import { useNavigate } from "react-router-dom";

const ConversationPage = () => {
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
        if (!isAuthenticated) {
            navigate("/login");
        }

        fetchStudyGroup();
    }, [groupId, getToken, navigate, isAuthenticated, authChecked]);

    if (!studyGroup) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <h2 className="mb-4 text-center">{studyGroup.name}</h2>
                <MessagesComponent studyGroup={studyGroup} />
            </Row>
        </Container>
    );
};

export default ConversationPage;
