import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { isAuthenticated, login, authChecked } = React.useContext(AuthContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!authChecked) {
            return;
        }
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate, authChecked]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const credentials = { email: email, password };
        login(credentials);
    };

    const handleCreateAccount = () => {
        navigate("/create-account");
    };

    if (!authChecked) {
        return null;
    }

    return (
        <Container fluid="md">
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={6}>
                    <h1 className="text-center">StudyBuddy</h1>
                    <h4 className="text-center mb-4">
                        A social learning platform
                    </h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Login
                            </Button>
                        </div>
                    </Form>
                    <div className="d-grid gap-2 mt-3">
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={handleCreateAccount}
                        >
                            Create Account
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
