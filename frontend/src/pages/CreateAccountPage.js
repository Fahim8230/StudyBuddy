import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const CreateAccountPage = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [stateId, setStateId] = React.useState("");
    const [universityId, setUniversityId] = React.useState("");
    const [states, setStates] = React.useState([]);
    const [universities, setUniversities] = React.useState([]);
    const { isAuthenticated, createAccount } = React.useContext(AuthContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isAuthenticated) {
            console.log("Navigating to home page");
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    React.useEffect(() => {
        axios
            .get("http://localhost:5000/states")
            .then((response) => setStates(response.data))
            .catch((error) => console.error("Error", error));
    }, []);

    React.useEffect(() => {
        if (stateId) {
            axios
                .get(`http://localhost:5000/universities/state/${stateId}`)
                .then((response) => setUniversities(response.data))
                .catch((error) => console.error("Error universities", error));
        } else {
            setUniversities([]);
        }
    }, [stateId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name,
            email,
            password,
            state_id: stateId,
            university_id: universityId,
        };
        createAccount(userData);
    };

    return (
        <Container fluid="md">
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={6}>
                    <h1 className="text-center">Become a StudyBuddy</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

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

                        <Form.Group className="mb-3" controlId="formState">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                as="select"
                                value={stateId}
                                onChange={(e) => setStateId(e.target.value)}
                                required
                            >
                                <option value="">Select state</option>
                                {states.map((state) => (
                                    <option key={state.id} value={state.id}>
                                        {state.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        {stateId && (
                            <Form.Group
                                className="mb-3"
                                controlId="formUniversity"
                            >
                                <Form.Label>University</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={universityId}
                                    onChange={(e) =>
                                        setUniversityId(e.target.value)
                                    }
                                    required
                                >
                                    <option value="">Select university</option>
                                    {universities.map((university) => (
                                        <option
                                            key={university.id}
                                            value={university.id}
                                        >
                                            {university.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        )}

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Create Account
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateAccountPage;
