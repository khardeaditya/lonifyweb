import React, { useState, useEffect } from "react";
import "./UserProfile.css";

const UserProfile = () => {
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        profilePic: ""
    });

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("userProfile")) || {};
        setUser(savedUser);
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUser({ ...user, profilePic: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        localStorage.setItem("userProfile", JSON.stringify(user));
        alert("Profile Updated Successfully!");
    };

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <div className="profile-pic-container">
                <img src={user.profilePic || "https://via.placeholder.com/150"} alt="Profile" />
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
            <div className="form-group">
                <label>Full Name:</label>
                <input type="text" name="fullName" value={user.fullName} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Phone:</label>
                <input type="text" name="phone" value={user.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Address:</label>
                <textarea name="address" value={user.address} onChange={handleChange}></textarea>
            </div>
            <button onClick={handleSave}>Save Changes</button>
        </div>
    );
};

export default UserProfile;
