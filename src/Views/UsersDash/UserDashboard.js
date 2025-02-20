import React, { useState } from "react";
import "./UserDashboard.css";

const UserDashboard = ({ loanRequests, setLoanRequests }) => {
    const [loanType, setLoanType] = useState("");
    const [amount, setAmount] = useState("");
    const [file, setFile] = useState(null);

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const applyForLoan = (e) => {
        e.preventDefault();
        if (!loanType || !amount || !file) {
            alert("Please fill all fields and upload a document.");
            return;
        }

        const newLoanRequest = {
            id: loanRequests.length + 1,
            type: loanType,
            amount,
            status: "Pending",
            date: new Date().toISOString().split("T")[0],
            document: file.name,
        };

        setLoanRequests([...loanRequests, newLoanRequest]);

        setLoanType("");
        setAmount("");
        setFile(null);
        alert("Loan application submitted successfully!");
    };

    return (
        <div className="dashboard">
            <h2>User Dashboard</h2>

            <div className="apply-loan">
                <h3>Apply for a Loan</h3>
                <form onSubmit={applyForLoan}>
                    <select value={loanType} onChange={(e) => setLoanType(e.target.value)} required>
                        <option value="">Select Loan Type</option>
                        <option value="Home Loan">Home Loan</option>
                        <option value="Car Loan">Car Loan</option>
                        <option value="Personal Loan">Personal Loan</option>
                        <option value="Education Loan">Education Loan</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Enter Loan Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <input type="file" onChange={handleFileUpload} required />
                    <button type="submit">Apply Now</button>
                </form>
            </div>
        </div>
    );
};

export default UserDashboard;