import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2>Loan Hub</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                {/* <li><Link to="/apply">Apply</Link></li> */}
                {/* <li><Link to="/calculator">Loan Calculator</Link></li> */}
                <li><Link to="/types">Loan Types</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                {/* <li><Link to="/loan-comparison">Loan Comparison</Link></li> */}
                {/* <li><Link to="/dashboard">Dashboard</Link></li> */}
                <li><Link to="/login">UserLogin</Link></li>
                {/* <li><Link to="/register">Register</Link></li> */}
                <li><Link to="/user-dashboard">UserDash</Link></li>
                <li><Link to="/admin-login">Admin</Link></li>

            </ul>
        </nav>
    );
};

export default Navbar;
