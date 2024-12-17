import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import MeetingsComponent from "../components/MeetingsComponent";
import { useNavigate } from "react-router-dom";

const MeetingsPage = () => {
    const { isAuthenticated, authChecked } = React.useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authChecked) {
            return;
        }
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, authChecked]);

    if (!authChecked) {
        return null;
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <h2 className="mb-4 text-center">My meetings</h2>
                <MeetingsComponent/>
            </Row>
        </Container>
    );
};

export default MeetingsPage;
