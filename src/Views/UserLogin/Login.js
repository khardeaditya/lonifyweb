import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/NavBar/NavBar";
import "./Login.css";

const Login = ({ setIsUserAuthenticated = () => { } }) => { // ✅ Ensure default function
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((user) => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem("isAuthenticated", "true"); // ✅ Store login status
            localStorage.setItem("userAuth", JSON.stringify(user));
            setIsUserAuthenticated(true);
            navigate("/dashboard"); // ✅ Redirect to user dashboard
        } else {
            setError("Invalid email or password!");
        }
    };

    return (
        <>
            <Navbar />
            <div className="auth-container">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <p>Don't have an account? <Link to="/register">Register</Link></p> {/* ✅ Use Link instead of <a> */}
            </div>
        </>

    );
};

export default Login;
