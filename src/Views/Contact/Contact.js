import React, { useState } from "react";
import "./Contact.css";
import Navbar from "../../components/NavBar/NavBar";
const ContactSupport = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message Sent!");
        setMessage("");
    };

    return (
        <>
        <Navbar />
                <div className="contact-support">
            <h2>Contact Support</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
        </>

    );
};

export default ContactSupport;
