import React, { useState } from "react";
import "./EMIPayment.css";

const EMIPayment = () => {
    const [paymentHistory, setPaymentHistory] = useState([
        { id: 1, amount: 5000, date: "2024-02-10", status: "Paid" },
        { id: 2, amount: 5000, date: "2024-01-10", status: "Paid" },
    ]);

    const handlePayment = () => {
        const newPayment = {
            id: paymentHistory.length + 1,
            amount: 5000,
            date: new Date().toISOString().split("T")[0],
            status: "Paid",
        };
        setPaymentHistory([...paymentHistory, newPayment]);
        alert("Payment Successful!");
    };

    return (
        <div className="emi-payment">
            <h2>EMI Payment</h2>
            <button onClick={handlePayment} className="pay-btn">Pay Now</button>
            <h3>Payment History</h3>
            <ul>
                {paymentHistory.map((payment) => (
                    <li key={payment.id}>
                        {payment.date} - ₹{payment.amount} ({payment.status})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EMIPayment;
