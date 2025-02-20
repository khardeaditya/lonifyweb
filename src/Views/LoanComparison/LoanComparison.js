import React from "react";
import "./LoanComparison.css";

const loans = [
    { type: "Personal Loan", rate: "10.5%", tenure: "5 Years", emi: "₹4,350", total: "₹2,61,000" },
    { type: "Home Loan", rate: "7.2%", tenure: "15 Years", emi: "₹2,500", total: "₹4,50,000" },
    { type: "Auto Loan", rate: "9.0%", tenure: "7 Years", emi: "₹3,000", total: "₹2,52,000" }
];

const LoanComparison = () => {
    return (
        <div className="loan-comparison">
            <h2>Compare Loan Options</h2>
            <table>
                <thead>
                    <tr>
                        <th>Loan Type</th>
                        <th>Interest Rate</th>
                        <th>Tenure</th>
                        <th>EMI</th>
                        <th>Total Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan, index) => (
                        <tr key={index}>
                            <td>{loan.type}</td>
                            <td>{loan.rate}</td>
                            <td>{loan.tenure}</td>
                            <td>{loan.emi}</td>
                            <td>{loan.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoanComparison;
