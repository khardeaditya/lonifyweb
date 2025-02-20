// import React, { useEffect, useState } from "react";
// // import emailjs from "emailjs-com"; // Import EmailJS
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./AdminDashboard.css";




const AdminDashboard = () => {
    const [loanRequests, setLoanRequests] = useState([]);
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        const storedRequests = JSON.parse(localStorage.getItem("loanRequests")) || [];
        setLoanRequests(storedRequests);
    }, []);

    const sendEmailNotification = (userEmail, status) => {
        const templateParams = {  // Define templateParams here
            user_email: userEmail,
            status: status,
        };
        emailjs
        .send(
            "service_p5q9ifz", // EmailJS Service ID
            "template_jlvkppt", // Approvel ID
            templateParams,
            "psaVh85Z_4nlGBGJi" //  EmailJS Public Key
        )            .then((response) => {
                console.log("Email sent successfully:", response);
            })
            .catch((error) => {
                console.error("Email sending failed:", error);
            });
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
                                    <td className="border border-gray-300 p-2">${loan.loanAmount}</td>
                                    <td className="border border-gray-300 p-2">${loan.income}</td>
                                     <td className="border border-gray-300 p-2">{loan.documentName}</td>



                                    <td
                                        className={`border border-gray-300 p-2 font-semibold ${
                                            loan.status === "Approved"
                                                ? "text-green-600"
                                                : loan.status === "Rejected"
                                                ? "text-red-600"
                                                : "text-yellow-600"
                                        }`}
                                    >
                                        {loan.status}
                                    </td>
                                    <td className="border border-gray-300 p-2 flex justify-center gap-2">
                                        {loan.status === "Pending" && (
                                            <>
                                                <button
                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                                                    onClick={() => updateLoanStatus(index, "Approved")}
                                                >
                                                    ✅ Approve
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                                    onClick={() => updateLoanStatus(index, "Rejected")}
                                                >
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
        </div>
    );
};

export default AdminDashboard;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import emailjs from "@emailjs/browser";
// import "./AdminDashboard.css";

// const AdminDashboard = () => {
//     const navigate = useNavigate();
//     const [loanRequests, setLoanRequests] = useState([]);

//     useEffect(() => {
//         const requests = JSON.parse(localStorage.getItem("loanRequests")) || [];
//         setLoanRequests(requests);
//     }, []);

//     const sendEmailNotification = (userEmail, loanType, loanAmount, loanStatus) => {
//         const templateParams = {
//             user_email: userEmail,
//             loan_type: loanType,
//             loan_amount: loanAmount,
//             loan_status: loanStatus,
//         };

//         emailjs
//             .send(
//                 "service_p5q9ifz", // EmailJS Service ID
//                 "template_jlvkppt", // Approvel ID
//                 templateParams,
//                 "psaVh85Z_4nlGBGJi" //  EmailJS Public Key
//             )
//             .then((response) => {
//                 console.log("Email sent successfully!", response.status, response.text);
//             })
//             .catch((error) => {
//                 console.error("Error sending email:", error);
//             });
//     };

//     const updateLoanStatus = (id, status) => {
//         const updatedRequests = loanRequests.map((loan) => {
//             if (loan.id === id) {
//                 sendEmailNotification(loan.userEmail, loan.loanType, loan.loanAmount, status);
//                 return { ...loan, status };
//             }
//             return loan;
//         });

//         setLoanRequests(updatedRequests);
//         localStorage.setItem("loanRequests", JSON.stringify(updatedRequests));
//     };

//     return (
//         <div className="admin-dashboard">
//             <button onClick={() => navigate("/admin-emi-payments")}>View EMI Payments</button>;

//             <h2>Admin Loan Requests</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>User Email</th>
//                         <th>Loan Type</th>
//                         <th>Amount</th>
//                         <th>Income</th>
//                         <th>Document</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {loanRequests.map((loan) => (
//                         <tr key={loan.id}>
//                             <td>{loan.userEmail}</td>
//                             <td>{loan.loanType}</td>
//                             <td>${loan.loanAmount}</td>
//                             <td>${loan.income}</td>
//                             <td>{loan.documentName}</td>
//                             <td>{loan.status}</td>
//                             <td>
//                                 <button onClick={() => updateLoanStatus(loan.id, "Approved")}>Approve</button>
//                                 <button onClick={() => updateLoanStatus(loan.id, "Rejected")}>Reject</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminDashboard;
