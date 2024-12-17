import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const HomePage = () => {
    const { isAuthenticated, authChecked } = useContext(AuthContext);
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
        const getRandomQuote = async () => {
            try {
                const api_url = "http://api.quotable.io/random";
                let response = await axios.get(api_url);
                setQuote(response.data.content);
                setAuthor(response.data.author);
            } catch (error) {
                console.error("Error fetching quote:", error);
            }
        };
        getRandomQuote();
    }, [isAuthenticated, navigate, authChecked]);

    if (!authChecked) {
        return null;
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8} className="text-center">
                    <h1 className="mb-4">Welcome to StudyBuddy</h1>
                    <p className="lead">
                        Your one-stop solution for managing study groups,
                        finding new groups, and staying connected with your
                        peers.
                    </p>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Text className="blockquote mb-0">
                                "{quote}"
                            </Card.Text>
                            <footer className="blockquote-footer mt-2">
                                {author}
                            </footer>
                        </Card.Body>
                    </Card>
                    <Button
                        variant="primary"
                        size="lg"
                        as={Link}
                        to="/my-groups"
                    >
                        Get Started
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;