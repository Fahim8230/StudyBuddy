import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ChangePasswordForm = ({ onSubmit }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { getToken } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match");
            return;
        }

        try {
            const token = await getToken();
            await axios.post(
                "http://127.0.0.1:5000/users/change-password",
                {
                    current_password: currentPassword,
                    new_password: newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onSubmit();
        } catch (error) {
            console.error("Error changing password:", error);
            alert("Failed to change the password.");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCurrentPassword" className="mb-3">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formNewPassword" className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
                Change Password
            </Button>
        </Form>
    );
};

export default ChangePasswordForm;
