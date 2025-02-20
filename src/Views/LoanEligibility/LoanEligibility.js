import React, { useState } from "react";
import "./LoanEligibility.css";

const LoanEligibility = () => {
    const [income, setIncome] = useState("");
    const [result, setResult] = useState("");

    const checkEligibility = () => {
        if (income >= 30000) {
            setResult("✅ You are eligible for a loan!");
        } else {
            setResult("❌ You are not eligible for a loan.");
        }
    };

    return (
        <div className="loan-eligibility">
            <h2>Loan Eligibility Checker</h2>
            <input type="number" placeholder="Enter Monthly Income" value={income} onChange={(e) => setIncome(e.target.value)} />
            <button onClick={checkEligibility}>Check Eligibility</button>
            <p>{result}</p>
        </div>
    );
};

export default LoanEligibility;
