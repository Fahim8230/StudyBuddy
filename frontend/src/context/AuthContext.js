import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/users/auth",
                { withCredentials: true }
            );
            if (response.status === 200 && response.data.auth) {
                setIsAuthenticated(true);
                setUser(response.data.user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error("Error checking authentication status", error);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const createAccount = async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/users/create-user",
                data,
                { withCredentials: true }
            );
            if (response.status === 200 && response.data.auth) {
                console.log("SETTINGS USER", response.data.user);
                checkAuthStatus();
            }
        } catch (error) {
            console.error("Account creation failed", error);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/users/login",
                credentials,
                { withCredentials: true }
            );
            if (response.status === 200 && response.data.auth) {
                setIsAuthenticated(true);
                setUser(response.data.user);
            }
        } catch (error) {
            console.error("Login failed", error);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const logout = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/users/logout",
                {},
                { withCredentials: true }
            );
            if (response.status === 200) {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, createAccount, user, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
