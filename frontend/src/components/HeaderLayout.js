import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const HeaderLayout = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        StudyBuddy
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/my-groups">
                                My Groups
                            </Nav.Link>
                            <Nav.Link as={Link} to="/find-group">
                                Find a Group
                            </Nav.Link>
                            <Nav.Link as={Link} to="/create-group">
                                Create a Group
                            </Nav.Link>
                            <Nav.Link as={Link} to="/messages">
                                Messages
                            </Nav.Link>
                            <Nav.Link as={Link} to="/meetings">
                                Meetings
                            </Nav.Link>
                            <Nav.Link as={Link} to="/my-profile">
                                My Profile
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Outlet />
            </Container>
        </div>
    );
};

export default HeaderLayout;
