import React, { useState } from "react";
import "./EMIPayment.css";
import emailjs from "@emailjs/browser";

const EMIPayment = () => {
    const [amount, setAmount] = useState("");


    const handlePayment = async () => {
        if (!amount) {
            alert("Please enter a valid amount.");
            return;
        }
    
        const options = {
            key: "rzp_test_JZKXPjI1z7mX37",
            amount: amount * 100, // Convert to paise
            currency: "INR",
            name: "Loan EMI Payment",
            description: "Monthly EMI Payment",
            image: "https://yourwebsite.com/logo.png",
            handler: function (response) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
    
                const userEmail = localStorage.getItem("userEmail");
    
                const paymentData = {
                    userEmail: userEmail,
                    amount: amount,
                    transactionId: response.razorpay_payment_id,
                    date: new Date().toLocaleString(),
                    status: "Success",
                };
    
                const existingPayments = JSON.parse(localStorage.getItem("emiPayments")) || [];
                existingPayments.push(paymentData);
                localStorage.setItem("emiPayments", JSON.stringify(existingPayments));
    
                // ✅ Send Confirmation Email
                sendPaymentEmail(userEmail, amount, response.razorpay_payment_id);
            },
            prefill: {
                name: "User Name",
                email: localStorage.getItem("userEmail") || "user@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };
    
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };
    
    // Function to send email
    const sendPaymentEmail = (userEmail, amount, transactionId) => {
        const templateParams = {
            userEmail: userEmail,
            amount: amount,
            transactionId: transactionId,
        };
    
        emailjs
            .send("service_p5q9ifz",
                 "template_iwakwfo",    //Payment Succes ID
                  templateParams, 
                  "psaVh85Z_4nlGBGJi")
            .then(
                (response) => {
                    console.log("Email sent successfully!", response.status, response.text);
                    alert("Payment confirmation email sent!");
                },
                (error) => {
                    console.error("Email failed to send:", error);
                    alert("Failed to send payment confirmation email.");
                }
            );
    };
    
    

    return (
        <div className="emi-payment">
            <h2>Loan EMI Payment</h2>
            <div className="form-group">
                <label>Enter EMI Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
            </div>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default EMIPayment;
