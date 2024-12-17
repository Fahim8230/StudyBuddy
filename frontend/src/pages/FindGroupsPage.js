import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const FindGroupsPage = () => {
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
                    const token = await getToken();
                    const response = await axios.get(
                        "http://127.0.0.1:5000/study-groups/of-interest",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
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

    const handleJoinGroup = async (groupId) => {
        try {
            const token = await getToken();
            await axios.post(
                `http://127.0.0.1:5000/memberships/join-group/${groupId}`,
                { study_group_id: groupId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            navigate(`/study-group/${groupId}`);
        } catch (error) {
            console.error("Error joining group:", error);
            alert("Failed to join the group.");
        }
    };

    if(!isAuthenticated) {
        return;
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1 className="mb-4 text-center">Groups of Interest</h1>
                    {groups.length > 0 ? (
                        groups.map((group) => (
                            <Card key={group.id} className="mb-3 shadow-sm">
                                <Card.Body>
                                    <Card.Title>{group.name}</Card.Title>
                                    <Card.Text>{group.description}</Card.Text>
                                    <Card.Text className="text-muted">
                                        University: {group.university}
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() =>
                                            handleJoinGroup(group.id)
                                        }
                                    >
                                        Join Group
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center">
                            <p className="lead">No groups of interest found.</p>
                            <Button
                                variant="primary"
                                as={Link}
                                to="/create-group"
                                className="mb-2"
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

export default FindGroupsPage;
