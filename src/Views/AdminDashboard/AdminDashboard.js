import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [loanRequests, setLoanRequests] = useState([]);

    useEffect(() => {
        const requests = JSON.parse(localStorage.getItem("loanRequests")) || [];
        setLoanRequests(requests);
    }, []);

    const updateLoanStatus = (id, status) => {
        const updatedRequests = loanRequests.map((loan) => 
            loan.id === id ? { ...loan, status } : loan
        );
        setLoanRequests(updatedRequests);
        localStorage.setItem("loanRequests", JSON.stringify(updatedRequests));
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Loan Requests</h2>
            <table>
                <thead>
                    <tr>
                        <th>User Email</th>
                        <th>Loan Type</th>
                        <th>Amount</th>
                        <th>Income</th>
                        <th>Document</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loanRequests.map((loan) => (
                        <tr key={loan.id}>
                            <td>{loan.userEmail}</td>
                            <td>{loan.loanType}</td>
                            <td>${loan.loanAmount}</td>
                            <td>${loan.income}</td>
                            <td>{loan.documentName}</td>
                            <td>{loan.status}</td>
                            <td>
                                <button onClick={() => updateLoanStatus(loan.id, "Approved")}>Approve</button>
                                <button onClick={() => updateLoanStatus(loan.id, "Rejected")}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
