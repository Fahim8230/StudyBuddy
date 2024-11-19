import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Button } from "react-bootstrap";
const HomePage = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div
            className="d-flex justify-content-center align-items-center flex-column"
            style={{ height: "100vh" }}
        >
            <h2>Welcome to StudyBuddy</h2>
            <Button variant="primary" onClick={logout}>
                Logout
            </Button>
        </div>
    );
};

export default HomePage;
