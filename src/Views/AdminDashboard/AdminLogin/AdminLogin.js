import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./../../AdminDashboard/AdminLogin/AdminLogin";
import "./AdminLogin.css";

const AdminLogin = ({ setIsAdminAuthenticated }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Hardcoded Admin Credentials (Change Later)
        const adminUsername = "admin";
        const adminPassword = "admin123";

        if (username === adminUsername && password === adminPassword) {
            setIsAdminAuthenticated(true);
            localStorage.setItem("adminAuth", "true"); // Save Login Session
            navigate("/admin-dashboard");
        } else {
            setError("Invalid Username or Password!");
        }
    };

    return (
        <>
                <Navbar />
        <div className="admin-login">
            <h2>Admin Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
        </>

    );
};

export default AdminLogin;
