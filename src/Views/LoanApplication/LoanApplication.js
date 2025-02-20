import React from 'react';
import './LoanApplication.css';

const LoanApplication = () => {
    return (
        <div className="loan-application">
            <h1>Apply for a Loan</h1>
            <form>
                <label>Full Name:</label>
                <input type="text" placeholder="Enter your name" />

                <label>Loan Amount:</label>
                <input type="number" placeholder="Enter loan amount" />

                <label>Loan Type:</label>
                <select>
                    <option>Personal Loan</option>
                    <option>Home Loan</option>
                    <option>Car Loan</option>
                </select>

                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
};

export default LoanApplication;
