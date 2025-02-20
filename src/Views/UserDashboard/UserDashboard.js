import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import UserNavbar from "../../components/UserNavbar/UserNavbar";

const UserDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loanRequests, setLoanRequests] = useState([]);

    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem("userAuth"));
        if (!authUser) {
            navigate("/login");
        } else {
            setUser(authUser);
            let requests = JSON.parse(localStorage.getItem("loanRequests")) || [];

            // ✅ Update Loan Requests with EMI & GST Calculation
            requests = requests.map((loan) => {
                if (!loan.emiAmount) {
                    const emi = calculateEMI(loan.loanAmount, loan.interestRate, loan.tenure);
                    const gstAmount = emi * 0.18;
                    return { ...loan, emiAmount: emi, gstAmount, totalPayable: emi + gstAmount };
                }
                return loan;
            });

            setLoanRequests(requests);
            localStorage.setItem("loanRequests", JSON.stringify(requests));
        }
    }, [navigate]);

    // ✅ EMI Calculation Function
    const calculateEMI = (principal, annualRate, tenureMonths) => {
        const monthlyRate = annualRate / 12 / 100;
        return (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    };

    const handleEMIPayment = (loan) => {
        const options = {
            key: "rzp_test_JZKXPjI1z7mX37",
            amount: loan.totalPayable * 100, // Amount in paisa
            currency: "INR",
            name: "Loan EMI Payment",
            description: `EMI for Loan ID: ${loan.id}`,
            handler: function (response) {
                alert("Payment successful! Transaction ID: " + response.razorpay_payment_id);

                const updatedLoans = loanRequests.map(l =>
                    l.id === loan.id ? { ...l, lastEMIPaymentDate: new Date().toLocaleString(), isEMIPaid: true } : l
                );

                setLoanRequests(updatedLoans);
                localStorage.setItem("loanRequests", JSON.stringify(updatedLoans));
            },
            prefill: {
                email: user?.email,
                contact: "9999999999",
            },
            theme: {
                color: "#007bff",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <div className="user-dashboard">
            <UserNavbar />
            <div className="dashboard-container">
                <h2>Welcome, {user?.name}</h2>
                <p>Email: {user?.email}</p>

                <div className="dashboard-buttons">
                    <button onClick={() => navigate("/user-profile")}>Edit Profile</button>
                    <button onClick={() => navigate("/loan-history")}>View Loan History</button>
                    <button onClick={() => navigate("/apply-loan")}>Apply for a Loan</button>
                    <button onClick={() => navigate("/emi-payment")}>Pay EMI</button>
                    <button onClick={() => navigate("/payment-history")}>📜 View Payment History</button>
                </div>

                <h3>Your Loan Requests</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Loan Type</th>
                            <th>Amount</th>
                            <th>Interest Rate</th>
                            <th>Tenure (Months)</th>
                            <th>EMI Amount</th>
                            <th>GST (18%)</th>
                            <th>Total Payable</th>
                            <th>Income</th>
                            <th>Document</th>
                            <th>Status</th>
                            <th>Last EMI Paid</th>
                            <th>EMI Due Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
    {loanRequests.length > 0 ? (
        loanRequests.map((loan) => {
            // Ensure default values if any field is missing
            const emiAmount = loan.emiAmount || 0;
            const gstAmount = loan.gstAmount || 0;
            const totalPayable = loan.totalPayable || 0;

            return (
                <tr key={loan.id}>
                    <td>{loan.loanType}</td>
                    <td>₹{loan.loanAmount}</td>
                    <td>{loan.interestRate}%</td>
                    <td>{loan.tenure}</td>
                    <td>₹{emiAmount.toFixed(2)}</td>  {/* ✅ Ensure valid number */}
                    <td>₹{gstAmount.toFixed(2)}</td>  {/* ✅ Ensure valid number */}
                    <td>₹{totalPayable.toFixed(2)}</td>  {/* ✅ Ensure valid number */}
                    <td>₹{loan.income}</td>
                    <td>{loan.documentName}</td>
                    <td
                        style={{
                            color: loan.status === "Approved" ? "green" :
                                loan.status === "Rejected" ? "red" : "black",
                            fontWeight: "bold"
                        }}
                    >
                        {loan.status}
                    </td>
                    <td>{loan.lastEMIPaymentDate || "Not Paid"}</td>
                    <td>{loan.emiDueDate || "N/A"}</td>
                    <td>
                        {loan.status === "Approved" ? (
                            loan.isEMIPaid ? (
                                <span className="paid-label">Paid</span>
                            ) : (
                                <button className="pay-emi-btn" onClick={() => handleEMIPayment(loan)}>
                                    Pay EMI
                                </button>
                            )
                        ) : (
                            "N/A"
                        )}
                    </td>
                </tr>
            );
        })
    ) : (
        <tr>
            <td colSpan="13">No active loans</td>
        </tr>
    )}
</tbody>

                </table>
            </div>
        </div>
    );
};

export default UserDashboard;
