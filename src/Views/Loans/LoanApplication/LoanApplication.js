import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoanApplication.css";

const LoanApplication = () => {
    const navigate = useNavigate();
    const [loanType, setLoanType] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [income, setIncome] = useState("");
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        setDocuments(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!loanType || !loanAmount || !income || !documents) {
            setError("All fields are required!");
            return;
        }

        const user = JSON.parse(localStorage.getItem("userAuth"));
        if (!user) {
            navigate("/login");
            return;
        }

        const newLoanRequest = {
            id: Date.now(),
            userEmail: user.email,
            loanType,
            loanAmount,
            income,
            documentName: documents.name,
            status: "Pending",
        };

        const loanRequests = JSON.parse(localStorage.getItem("loanRequests")) || [];
        loanRequests.push(newLoanRequest);
        localStorage.setItem("loanRequests", JSON.stringify(loanRequests));

        alert("Loan application submitted successfully!");
        navigate("/dashboard");
    };

    return (
        <div className="loan-application-container">
            <h2>Apply for a Loan</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <select value={loanType} onChange={(e) => setLoanType(e.target.value)} required>
                    <option value="">Select Loan Type</option>
                    <option value="Home Loan">Home Loan</option>
                    <option value="Car Loan">Car Loan</option>
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Education Loan">Education Loan</option>
                </select>
                <input type="number" placeholder="Loan Amount" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} required />
                <input type="number" placeholder="Monthly Income" value={income} onChange={(e) => setIncome(e.target.value)} required />
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
};

export default LoanApplication;
