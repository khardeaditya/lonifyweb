import React, { useEffect, useState } from "react";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const storedPayments = JSON.parse(localStorage.getItem("emiPayments")) || [];
        setPayments(storedPayments);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold text-center mb-4">📜 EMI Payment History</h2>

            <div className="bg-white shadow-md rounded-lg p-4">
                {payments.length === 0 ? (
                    <p className="text-gray-500 text-center">No payment history found.</p>
                ) : (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="border border-gray-300 p-2">Date</th>
                                <th className="border border-gray-300 p-2">Amount</th>
                                <th className="border border-gray-300 p-2">Transaction ID</th>
                                <th className="border border-gray-300 p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={index} className="text-center bg-gray-50 even:bg-gray-200">
                                    <td className="border border-gray-300 p-2">{payment.date}</td>
                                    <td className="border border-gray-300 p-2">₹{payment.amount}</td>
                                    <td className="border border-gray-300 p-2">{payment.transactionId}</td>
                                    <td className="border border-gray-300 p-2 text-green-600 font-semibold">
                                        {payment.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};


export default PaymentHistory;
