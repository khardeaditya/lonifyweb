import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoanApplication.css";

const LoanApplication = () => {
    const navigate = useNavigate();
    const [loanType, setLoanType] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [income, setIncome] = useState("");
    const [duration, setDuration] = useState(""); // Loan duration in months
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState("");

    // Constants for calculations
    const interestRate = 10; // Example: 10% per year
    const gstRate = 18; // 18% GST

    // Convert inputs to numbers safely
    const loanAmountNum = parseFloat(loanAmount) || 0;
    const durationNum = parseInt(duration) || 0;
    const interestRateNum = parseFloat(interestRate);
    const gstRateNum = parseFloat(gstRate);

    // EMI Calculation
    const calculateEMI = () => {
        if (!loanAmountNum || !durationNum || !interestRateNum) return 0;

        const monthlyInterest = interestRateNum / 12 / 100;
        const emi =
            (loanAmountNum * monthlyInterest * Math.pow(1 + monthlyInterest, durationNum)) /
            (Math.pow(1 + monthlyInterest, durationNum) - 1);

        return isNaN(emi) ? 0 : emi;
    };

    // Compute EMI, GST, and Total Payable Amount
    const emiAmount = calculateEMI();
    const totalInterest = emiAmount * durationNum - loanAmountNum;
    const gstAmount = (totalInterest * gstRateNum) / 100;
    const totalPayable = loanAmountNum + totalInterest + gstAmount;

    // Ensure values are properly formatted
    const formattedEMI = emiAmount ? emiAmount.toFixed(2) : "0.00";
    const formattedGst = gstAmount ? gstAmount.toFixed(2) : "0.00";
    const formattedTotalPayable = totalPayable ? totalPayable.toFixed(2) : "0.00";

    // Handle file input
    const handleFileChange = (e) => {
        setDocuments(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!loanType || !loanAmount || !income || !duration || !documents) {
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
            loanAmount: loanAmountNum,
            duration: durationNum,
            interestRate,
            emiAmount: formattedEMI,
            gstAmount: formattedGst,
            totalPayable: formattedTotalPayable,
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

                <input
                    type="number"
                    placeholder="Loan Amount (₹)"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Monthly Income (₹)"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    required
                />

                <select value={duration} onChange={(e) => setDuration(e.target.value)} required>
                    <option value="">Select Loan Duration (Months)</option>
                    <option value="12">12 Months (1 Year)</option>
                    <option value="24">24 Months (2 Years)</option>
                    <option value="36">36 Months (3 Years)</option>
                    <option value="48">48 Months (4 Years)</option>
                    <option value="60">60 Months (5 Years)</option>
                </select>

                <input type="file" onChange={handleFileChange} required />

                {/* Calculation Preview */}
                {loanAmount && duration && (
                    <div className="loan-summary">
                        <p><strong>Interest Rate:</strong> {interestRate}% per year</p>
                        <p><strong>Monthly EMI:</strong> ₹{formattedEMI}</p>
                        <p><strong>GST on Interest:</strong> ₹{formattedGst} ({gstRate}%)</p>
                        <p><strong>Total Payable Amount:</strong> ₹{formattedTotalPayable}</p>
                    </div>
                )}

                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
};

export default LoanApplication;
