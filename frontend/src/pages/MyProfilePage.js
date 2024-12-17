import React, { useContext, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ChangePasswordForm from "../components/ChangePasswordForm";

const MyProfilePage = () => {
    const { user, isAuthenticated, logout, authChecked } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        if(!authChecked) {
            return;
        }
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, authChecked]);

    if(!isAuthenticated) {
        return null;
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title className="text-center">
                                My Profile
                            </Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {user.name}
                            </Card.Text>
                            <Card.Text>
                                <strong>Email:</strong> {user.email}
                            </Card.Text>
                            <Card.Text>
                                <strong>State:</strong> {user.state}
                            </Card.Text>
                            <Card.Text>
                                <strong>University:</strong> {user.university}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Button
                        variant="primary"
                        onClick={() => setShowModal(true)}
                        className="mb-2 w-100"
                    >
                        Change Password
                    </Button>
                    <Button
                        variant="danger"
                        onClick={logout}
                        className="mb-2 w-100"
                    >
                        Logout
                    </Button>
                </Col>
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ChangePasswordForm onSubmit={() => setShowModal(false)} />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default MyProfilePage;
