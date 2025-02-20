import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserNavbar.css"; // Add CSS for styling

const UserNavbar = ({ setIsUserAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated"); // Remove auth status
        localStorage.removeItem("userAuth"); // Remove user data
        setIsUserAuthenticated(false);
        navigate("/login"); // Redirect to login
    };

    return (
        <nav className="user-navbar">
            <h2>Loan Portal</h2>
            <ul>
                <li><Link to="/user-dashboard">Dashboard</Link></li>
                <li><Link to="/apply-loan">Apply for Loan</Link></li>
                <li><Link to="/loan-status">Loan Status</Link></li>
                <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </ul>
        </nav>
    );
};

export default UserNavbar;
