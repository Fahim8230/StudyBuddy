import React, { useState, useEffect, useContext, useRef } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const MessagesComponent = ({ studyGroup }) => {
    const [messages, setMessages] = useState([]);
    const { isAuthenticated, getToken, user } = useContext(AuthContext);
    const messagesEndRef = useRef(null);

    const fetchMessages = async () => {
        try {
            const token = await getToken();
            const response = await axios.get(
                `http://127.0.0.1:5000/messages/study-group/${studyGroup.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            setMessages(
                response.data.map((m) => {
                    return { ...m, isUser: m.user_id === user.id };
                })
            );
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchMessages();
        }
    }, [isAuthenticated, getToken]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            const token = await getToken();
            await axios.post(
                `http://127.0.0.1:5000/messages/`,
                {
                    message: newMessage,
                    study_group_id: studyGroup.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            setNewMessage("");
            fetchMessages();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <Container className="d-flex flex-column" style={{ height: "80vh" }}>
            <div className="flex-grow-1 mb-4" style={{ overflowY: "auto" }}>
                {messages.map((msg) => (
                    <Row
                        key={msg.id}
                        className="mb-2"
                        style={{ maxWidth: "100%" }}
                    >
                        <Col md={msg.isUser ? { span: 6, offset: 6 } : 6}>
                            <Card
                                className={
                                    msg.isUser
                                        ? "bg-primary text-white"
                                        : "bg-light"
                                }
                            >
                                <Card.Body>
                                    <Card.Text>{msg.message}</Card.Text>
                                    <Card.Footer className="text-muted small">
                                        {msg.user} - {msg.message_date}
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <Form onSubmit={handleSendMessage}>
                <Row>
                    <Col md={10}>
                        <Form.Group controlId="formMessage">
                            <Form.Control
                                type="text"
                                autoComplete="off"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                required
                                style={{ height: "50px" }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                        >
                            Send
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default MessagesComponent;
