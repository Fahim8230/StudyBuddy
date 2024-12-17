import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsAuthenticated(false);
            setUser(null);
            setAuthChecked(true);
            return;
        }

        try {
            const response = await axios.get(
                "http://127.0.0.1:5000/users/auth",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            if (response.status === 200 && response.data.auth) {
                setIsAuthenticated(true);
                setUser(response.data.user);
                setAuthChecked(true);
            } else {
                setIsAuthenticated(false);
                setUser(null);
                setAuthChecked(true);
            }
        } catch (error) {
            console.error("Error checking authentication status", error);
            setIsAuthenticated(false);
            setUser(null);
            setAuthChecked(true);
        }
    };

    const createAccount = async (data) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/users/create-user",
                data,
                { withCredentials: true }
            );
            if (response.status === 200 && response.data.auth) {
                console.log("SETTINGS USER", response.data.user);
                localStorage.setItem("token", response.data.token);
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
                "http://127.0.0.1:5000/users/login",
                credentials,
                { withCredentials: true }
            );
            console.log("RESPONSE", response);
            if (response.status === 200 && response.data.auth) {
                console.log("RESPONSE", response.data);
                localStorage.setItem("token", response.data.token);
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
        // try {
        //     const response = await axios.post(
        //         "http://127.0.0.1:5000/users/logout",
        //         {},
        //         { withCredentials: true }
        //     );
        //     if (response.status === 200) {
        //         setIsAuthenticated(false);
        //         setUser(null);
        //     }
        // } catch (error) {
        //     console.error("Logout failed", error);
        // }
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    const getToken = () => {
        return localStorage.getItem("token");
    };

    if (!authChecked) {
        return null;
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                createAccount,
                user,
                login,
                logout,
                getToken,
                authChecked,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
