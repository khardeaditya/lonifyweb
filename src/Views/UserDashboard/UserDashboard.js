import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import UserNavbar from "../../components/UserNavbar/UserNavbar";

const UserDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loanRequests, setLoanRequests] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);

    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem("userAuth"));
        if (!authUser) {
            navigate("/login");
        } else {
            setUser(authUser);
            let requests = JSON.parse(localStorage.getItem("loanRequests")) || [];
            let history = JSON.parse(localStorage.getItem("paymentHistory")) || [];

            requests = requests.map((loan) => {
                if (!loan.emiAmount) {
                    const emi = calculateEMI(Number(loan.loanAmount), Number(loan.interestRate), Number(loan.tenure));
                    const gstAmount = emi * 0.18;
                    return { ...loan, emiAmount: emi, gstAmount, totalPayable: loan.loanAmount + gstAmount };
                }
                return loan;
            });

            setLoanRequests(requests);
            setPaymentHistory(history);
            localStorage.setItem("loanRequests", JSON.stringify(requests));
        }
    }, [navigate]);

    const calculateEMI = (principal, annualRate, tenureMonths) => {
        if (!principal || !annualRate || !tenureMonths) return 0;
        const monthlyRate = annualRate / 12 / 100;
        return (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    };

    const getNextEMIDueDate = (lastPaidDate) => {
        let nextDate = new Date(lastPaidDate);
        nextDate.setMonth(nextDate.getMonth() + 1);
        return nextDate.toLocaleDateString();
    };

    const handleEMIPayment = (loan) => {
        const options = {
            key: "rzp_test_JZKXPjI1z7mX37",
            amount: Math.round(loan.emiAmount * 100),
            currency: "INR",
            name: "Loan EMI Payment",
            description: `EMI for Loan ID: ${loan.id}`,
            handler: function (response) {
                alert("Payment successful! Transaction ID: " + response.razorpay_payment_id);

                const updatedLoans = loanRequests.map(l => {
                    if (l.id === loan.id) {
                        const newTotalPayable = l.totalPayable - l.emiAmount;
                        return {
                            ...l,
                            totalPayable: newTotalPayable,
                            lastEMIPaymentDate: new Date().toLocaleString(),
                            emiDueDate: getNextEMIDueDate(new Date()),
                            isEMIPaid: newTotalPayable <= 0
                        };
                    }
                    return l;
                });

                const newTransaction = {
                    loanId: loan.id,
                    amountPaid: loan.emiAmount,
                    date: new Date().toLocaleString(),
                    transactionId: response.razorpay_payment_id,
                    userEmail: user?.email
                };

                const newPaymentHistory = [...paymentHistory, newTransaction];
                setLoanRequests(updatedLoans);
                setPaymentHistory(newPaymentHistory);
                localStorage.setItem("loanRequests", JSON.stringify(updatedLoans));
                localStorage.setItem("paymentHistory", JSON.stringify(newPaymentHistory));
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
                                const emiAmount = parseFloat(loan.emiAmount) || 0;
                                const gstAmount = parseFloat(loan.gstAmount) || 0;
                                const totalPayable = parseFloat(loan.totalPayable) || 0;

                                return (
                                    <tr key={loan.id}>
                                        <td>{loan.loanType}</td>
                                        <td>₹{loan.loanAmount}</td>
                                        <td>{loan.interestRate}%</td>
                                        <td>{loan.tenure}</td>
                                        <td>₹{emiAmount.toFixed(2)}</td>
                                        <td>₹{gstAmount.toFixed(2)}</td>
                                        <td>₹{totalPayable.toFixed(2)}</td>
                                        <td>₹{loan.income}</td>
                                        <td>{loan.documentName}</td>
                                        <td>{loan.status}</td>
                                        <td>{loan.lastEMIPaymentDate || "Not Paid"}</td>
                                        <td>{loan.emiDueDate || "N/A"}</td>
                                        <td>
                                            {loan.status === "Approved" && totalPayable > 0 ? (
                                                <button className="pay-emi-btn" onClick={() => handleEMIPayment(loan)}>
                                                    Pay EMI
                                                </button>
                                            ) : "N/A"}
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



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./UserDashboard.css";
// import UserNavbar from "../../components/UserNavbar/UserNavbar";

// const UserDashboard = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);
//     const [loanRequests, setLoanRequests] = useState([]);

//     useEffect(() => {
//         const authUser = JSON.parse(localStorage.getItem("userAuth"));
//         if (!authUser) {
//             navigate("/login");
//         } else {
//             setUser(authUser);
//             let requests = JSON.parse(localStorage.getItem("loanRequests")) || [];

//             requests = requests.map((loan) => {
//                 if (!loan.emiAmount) {
//                     const emi = calculateEMI(Number(loan.loanAmount), Number(loan.interestRate), Number(loan.tenure));
//                     const gstAmount = emi * 0.18;
//                     return { ...loan, emiAmount: emi, gstAmount, totalPayable: emi + gstAmount };
//                 }
//                 return loan;
//             });

//             setLoanRequests(requests);
//             localStorage.setItem("loanRequests", JSON.stringify(requests));
//         }
//     }, [navigate]);

//     const calculateEMI = (principal, annualRate, tenureMonths) => {
//         if (!principal || !annualRate || !tenureMonths) return 0;
//         const monthlyRate = annualRate / 12 / 100;
//         return (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
//     };

//     const handleEMIPayment = (loan) => {
//         const options = {
//             key: "rzp_test_JZKXPjI1z7mX37",
//             amount: Math.round(loan.totalPayable * 100),
//             currency: "INR",
//             name: "Loan EMI Payment",
//             description: `EMI for Loan ID: ${loan.id}`,
//             handler: function (response) {
//                 alert("Payment successful! Transaction ID: " + response.razorpay_payment_id);
//                 const updatedLoans = loanRequests.map(l =>
//                     l.id === loan.id ? { ...l, lastEMIPaymentDate: new Date().toLocaleString(), isEMIPaid: true } : l
//                 );
//                 setLoanRequests(updatedLoans);
//                 localStorage.setItem("loanRequests", JSON.stringify(updatedLoans));
//             },
//             prefill: {
//                 email: user?.email,
//                 contact: "9999999999",
//             },
//             theme: {
//                 color: "#007bff",
//             },
//         };
//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//     };

//     return (
//         <div className="user-dashboard">
//             <UserNavbar />
//             <div className="dashboard-container">
//                 <h2>Welcome, {user?.name}</h2>
//                 <p>Email: {user?.email}</p>

//                 <div className="dashboard-buttons">
//                     <button onClick={() => navigate("/user-profile")}>Edit Profile</button>
//                     <button onClick={() => navigate("/loan-history")}>View Loan History</button>
//                     <button onClick={() => navigate("/apply-loan")}>Apply for a Loan</button>
//                     <button onClick={() => navigate("/emi-payment")}>Pay EMI</button>
//                     <button onClick={() => navigate("/payment-history")}>📜 View Payment History</button>
//                 </div>

//                 <h3>Your Loan Requests</h3>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Loan Type</th>
//                             <th>Amount</th>
//                             <th>Interest Rate</th>
//                             <th>Tenure (Months)</th>
//                             <th>EMI Amount</th>
//                             <th>GST (18%)</th>
//                             <th>Total Payable</th>
//                             <th>Income</th>
//                             <th>Document</th>
//                             <th>Status</th>
//                             <th>Last EMI Paid</th>
//                             <th>EMI Due Date</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {loanRequests.length > 0 ? (
//                             loanRequests.map((loan) => {
//                                 const emiAmount = parseFloat(loan.emiAmount) || 0;
//                                 const gstAmount = parseFloat(loan.gstAmount) || 0;
//                                 const totalPayable = parseFloat(loan.totalPayable) || 0;

//                                 return (
//                                     <tr key={loan.id}>
//                                         <td>{loan.loanType}</td>
//                                         <td>₹{loan.loanAmount}</td>
//                                         <td>{loan.interestRate}%</td>
//                                         <td>{loan.tenure}</td>
//                                         <td>₹{emiAmount.toFixed(2)}</td>
//                                         <td>₹{gstAmount.toFixed(2)}</td>
//                                         <td>₹{totalPayable.toFixed(2)}</td>
//                                         <td>₹{loan.income}</td>
//                                         <td>{loan.documentName}</td>
//                                         <td
//                                             style={{
//                                                 color: loan.status === "Approved" ? "green" :
//                                                     loan.status === "Rejected" ? "red" : "black",
//                                                 fontWeight: "bold"
//                                             }}
//                                         >
//                                             {loan.status}
//                                         </td>
//                                         <td>{loan.lastEMIPaymentDate || "Not Paid"}</td>
//                                         <td>{loan.emiDueDate || "N/A"}</td>
//                                         <td>
//                                             {loan.status === "Approved" ? (
//                                                 loan.isEMIPaid ? (
//                                                     <span className="paid-label">Paid</span>
//                                                 ) : (
//                                                     <button className="pay-emi-btn" onClick={() => handleEMIPayment(loan)}>
//                                                         Pay EMI
//                                                     </button>
//                                                 )
//                                             ) : (
//                                                 "N/A"
//                                             )}
//                                         </td>
//                                     </tr>
//                                 );
//                             })
//                         ) : (
//                             <tr>
//                                 <td colSpan="13">No active loans</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default UserDashboard;
