import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [loanRequests, setLoanRequests] = useState([]);
    const [paymentRecords, setPaymentRecords] = useState({});
    const [activeSection, setActiveSection] = useState("loanRequests");
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const storedRequests = JSON.parse(localStorage.getItem("loanRequests")) || [];
        setLoanRequests(storedRequests);

        const storedPayments = JSON.parse(localStorage.getItem("paymentHistory")) || [];
        const paymentsByUser = storedPayments.reduce((acc, payment) => {
            if (!acc[payment.userEmail]) {
                acc[payment.userEmail] = [];
            }
            acc[payment.userEmail].push(payment);
            return acc;
        }, {});
        setPaymentRecords(paymentsByUser);
    }, []);

    const sendEmailNotification = (userEmail, status) => {
        const templateParams = { user_email: userEmail, status };
        emailjs
            .send("service_p5q9ifz", "template_jlvkppt", templateParams, "psaVh85Z_4nlGBGJi")
            .then((response) => console.log("Email sent successfully:", response))
            .catch((error) => console.error("Email sending failed:", error));
    };

    const updateLoanStatus = (index, status) => {
        const updatedRequests = [...loanRequests];
        updatedRequests[index].status = status;
        setLoanRequests(updatedRequests);
        localStorage.setItem("loanRequests", JSON.stringify(updatedRequests));

        sendEmailNotification(updatedRequests[index].userEmail, status);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold text-center mb-4">📊 Admin Dashboard</h2>

            {/* Section Navigation */}
            <div className="flex justify-center gap-4 mb-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setActiveSection("loanRequests")}>
                    Loan Requests
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setActiveSection("paymentRecords")}>
                    Payment Records
                </button>
            </div>

            {/* Loan Requests Section */}
            {activeSection === "loanRequests" && (
                <div className="bg-white shadow-md rounded-lg p-4">
                    {loanRequests.length === 0 ? (
                        <p className="text-gray-500 text-center">No loan requests found.</p>
                    ) : (
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="border border-gray-300 p-2">Date</th>
                                    <th className="border border-gray-300 p-2">User Email</th>
                                    <th className="border border-gray-300 p-2">Loan Type</th>
                                    <th className="border border-gray-300 p-2">Amount</th>
                                    <th className="border border-gray-300 p-2">Income</th>
                                    <th className="border border-gray-300 p-2">Documents</th>
                                    <th className="border border-gray-300 p-2">Status</th>
                                    <th className="border border-gray-300 p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loanRequests.map((loan, index) => (
                                    <tr key={index} className="text-center bg-gray-50 even:bg-gray-200">
                                        <td className="border border-gray-300 p-2">{loan.date}</td>
                                        <td className="border border-gray-300 p-2">{loan.userEmail}</td>
                                        <td className="border border-gray-300 p-2">{loan.loanType}</td>
                                        <td className="border border-gray-300 p-2">₹{loan.loanAmount}</td>
                                        <td className="border border-gray-300 p-2">₹{loan.income}</td>
                                        <td className="border border-gray-300 p-2">{loan.documentName}</td>
                                        <td className={`border border-gray-300 p-2 font-semibold ${loan.status === "Approved" ? "text-green-600" : loan.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>
                                            {loan.status}
                                        </td>
                                        <td className="border border-gray-300 p-2 flex justify-center gap-2">
                                            {loan.status === "Pending" && (
                                                <>
                                                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700" onClick={() => updateLoanStatus(index, "Approved")}>
                                                        ✅ Approve
                                                    </button>
                                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700" onClick={() => updateLoanStatus(index, "Rejected")}>
                                                        ❌ Reject
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* Payment Records Section */}
            {activeSection === "paymentRecords" && (
                <div className="bg-white shadow-md rounded-lg p-4">
                    {Object.keys(paymentRecords).length === 0 ? (
                        <p className="text-gray-500 text-center">No payment records found.</p>
                    ) : (
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Users with Payment Records:</h3>
                            <ul className="mb-4">
                                {Object.keys(paymentRecords).map((userEmail) => (
                                    <li key={userEmail}>
                                        <button
                                            className="text-blue-600 hover:underline"
                                            onClick={() => setSelectedUser(userEmail)}
                                        >
                                            {userEmail}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {/* Display Transactions of Selected User */}
                            {selectedUser && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Payment History for {selectedUser}</h3>
                                    <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr className="bg-green-500 text-white">
                                                <th className="border border-gray-300 p-2">Date</th>
                                                <th className="border border-gray-300 p-2">Time</th>
                                                <th className="border border-gray-300 p-2">Amount Paid</th>
                                                <th className="border border-gray-300 p-2">Transaction ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paymentRecords[selectedUser].map((payment, index) => (
                                                <tr key={index} className="text-center bg-gray-50 even:bg-gray-200">
                                                    <td className="border border-gray-300 p-2">{payment.date.split(",")[0]}</td>
                                                    <td className="border border-gray-300 p-2">{payment.date.split(",")[1]}</td>
                                                    <td className="border border-gray-300 p-2">₹{payment.amountPaid}</td>
                                                    <td className="border border-gray-300 p-2">{payment.transactionId}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
