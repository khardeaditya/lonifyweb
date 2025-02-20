import React, { useState, useEffect } from "react";
import "./AdminEMIPayments.css";

const AdminEMIPayments = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const storedPayments = JSON.parse(localStorage.getItem("emiPayments")) || [];
        setPayments(storedPayments);
    }, []);

    return (
        <div className="admin-emi-payments">
            <h2>EMI Payment Tracker</h2>
            {payments.length === 0 ? (
                <p>No EMI payments found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>User Email</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={index}>
                                <td>{payment.userEmail}</td>
                                <td>${payment.amount}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.date}</td>
                                <td className={payment.status.toLowerCase()}>{payment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminEMIPayments;
