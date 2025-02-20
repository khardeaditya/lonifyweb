import React, { useState, useEffect } from "react";
import "./LoanHistory.css";

const LoanHistory = () => {
    const [loanHistory, setLoanHistory] = useState([]);

    useEffect(() => {
        const storedLoans = JSON.parse(localStorage.getItem("loanRequests")) || [];
        const userEmail = localStorage.getItem("loggedInUserEmail");
        const userLoans = storedLoans.filter(loan => loan.userEmail === userEmail);
        setLoanHistory(userLoans);
    }, []);

    return (
        <div className="loan-history">
            <h2>My Loan History</h2>
            {loanHistory.length === 0 ? (
                <p>No loan applications found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Loan Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Applied Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loanHistory.map((loan) => (
                            <tr key={loan.id}>
                                <td>{loan.loanType}</td>
                                <td>${loan.loanAmount}</td>
                                <td className={loan.status.toLowerCase()}>{loan.status}</td>
                                <td>{loan.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default LoanHistory;
