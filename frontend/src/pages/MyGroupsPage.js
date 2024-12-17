import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const MyGroupsPage = () => {
    const [groups, setGroups] = useState([]);
    const { isAuthenticated, getToken, authChecked } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authChecked) {
            return;
        }
        if (isAuthenticated) {
            const fetchGroups = async () => {
                try {
                    const token = getToken();
                    const response = await axios.get(
                        "http://127.0.0.1:5000/study-groups/my-groups",
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

            fetchGroups();
        } else {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, getToken, authChecked]);

    const handleCardClick = (groupId) => {
        navigate(`/study-group/${groupId}`);
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1 className="mb-4 text-center">My Groups</h1>
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
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center">
                            <p className="lead">
                                You are not part of any study groups yet.
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

export default MyGroupsPage;
