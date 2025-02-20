import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>© 2025 Loan Hub. All Rights Reserved.</p>
            <ul>
                <li><a href="/terms">Terms & Conditions</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
        </footer>
    );
};

export default Footer;
