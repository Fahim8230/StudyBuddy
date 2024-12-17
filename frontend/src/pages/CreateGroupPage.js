import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const CreateGroupPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { isAuthenticated, getToken, authChecked } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authChecked) {
            return;
        }
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, authChecked]);

    if(!isAuthenticated) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await getToken();
            await axios.post(
                "http://127.0.0.1:5000/study-groups/",
                {
                    name,
                    description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            navigate("/my-groups");
        } catch (error) {
            console.error("Error creating group:", error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h1 className="mb-4 text-center">Create a New Group</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formGroupName" className="mb-3">
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter group name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="formGroupDescription"
                            className="mb-3"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter group description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                        >
                            Create Group
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateGroupPage;
