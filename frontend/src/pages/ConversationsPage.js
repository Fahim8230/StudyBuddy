import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const ConversationsPage = () => {
    const [groups, setGroups] = useState([]);
    const { isAuthenticated, getToken, authChecked } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authChecked) {
            return;
        }
        if (isAuthenticated) {
            const fetchConversations = async () => {
                try {
                    const token = await getToken();
                    const response = await axios.get(
                        "http://127.0.0.1:5000/study-groups/conversations",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            withCredentials: true,
                        }
                    );
                    setGroups(response.data);
                } catch (error) {
                    console.error("Error fetching groups:", error);
                }
            };
            fetchConversations();
        } else {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, getToken, authChecked]);

    const handleCardClick = (groupId) => {
        navigate(`/conversation/${groupId}`);
    };

    if(!isAuthenticated) {
        return null;
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1 className="mb-4 text-center">My conversations</h1>
                    {groups.length > 0 ? (
                        groups.map((group) => (
                            <Card
                                key={group.id}
                                className="mb-3 shadow-sm"
                                onClick={() => handleCardClick(group.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <Card.Body>
                                    <Card.Title>{group.name}</Card.Title>
                                    <Card.Text>{group.description}</Card.Text>
                                    <Card.Text className="text-muted">
                                        University: {group.university}
                                    </Card.Text>
                                    {group.last_message && (
                                        <Card.Text className="text-muted">
                                            Last message by{" "}
                                            {group.last_message.user} on{" "}
                                            {new Date(
                                                group.last_message.message_date
                                            ).toLocaleDateString()}
                                        </Card.Text>
                                    )}
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center">
                            <p className="lead">
                                You have no conversations yet.
                            </p>
                            <Button
                                variant="primary"
                                as={Link}
                                to="/find-group"
                                className="mr-3 mb-2"
                            >
                                Find a Group
                            </Button>
                            <Button
                                variant="secondary"
                                as={Link}
                                to="/create-group"
                                className="mb-2 ml-2"
                                style={{ marginLeft: "20px" }}
                            >
                                Create a Group
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ConversationsPage;
