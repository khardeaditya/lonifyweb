import React, { useState } from "react";
import "./UserDashboard.css";

const UserDashboard = ({ loanRequests, setLoanRequests }) => {
    const [loanType, setLoanType] = useState("");
    const [amount, setAmount] = useState("");
    const [file, setFile] = useState(null);

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const applyForLoan = (e) => {
        e.preventDefault();
        if (!loanType || !amount || !file) {
            alert("Please fill all fields and upload a document.");
            return;
        }

        const newLoanRequest = {
            id: loanRequests.length + 1,
            type: loanType,
            amount,
            status: "Pending",
            date: new Date().toISOString().split("T")[0],
            document: file.name,
        };

        setLoanRequests([...loanRequests, newLoanRequest]);

        setLoanType("");
        setAmount("");
        setFile(null);
        alert("Loan application submitted successfully!");
    };

    return (
        <div className="dashboard">
            <h2>User Dashboard</h2>

            <div className="apply-loan">
                <h3>Apply for a Loan</h3>
                <form onSubmit={applyForLoan}>
                    <select value={loanType} onChange={(e) => setLoanType(e.target.value)} required>
                        <option value="">Select Loan Type</option>
                        <option value="Home Loan">Home Loan</option>
                        <option value="Car Loan">Car Loan</option>
                        <option value="Personal Loan">Personal Loan</option>
                        <option value="Education Loan">Education Loan</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Enter Loan Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <input type="file" onChange={handleFileUpload} required />
                    <button type="submit">Apply Now</button>
                </form>
            </div>
        </div>
    );
};

export default UserDashboard;



// import React, { useState } from "react";
// import "./UserDashboard.css";

// const UserDashboard = () => {
//     const [loans, setLoans] = useState([
//         { id: 1, type: "Home Loan", status: "Approved", date: "2025-02-15", amount: 500000, document: "home_loan.pdf" },
//         { id: 2, type: "Car Loan", status: "Pending", date: "2025-02-20", amount: 300000, document: "car_loan.pdf" }
//     ]);

//     const [file, setFile] = useState(null);
//     const [loanType, setLoanType] = useState("");
//     const [amount, setAmount] = useState("");

//     const handleFileUpload = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const applyForLoan = (e) => {
//         e.preventDefault();
//         if (!loanType || !amount || !file) {
//             alert("Please fill all fields and upload a document.");
//             return;
//         }

//         const newLoan = {
//             id: loans.length + 1,
//             type: loanType,
//             status: "Pending",
//             date: new Date().toISOString().split("T")[0],
//             amount: amount,
//             document: file.name,
//         };

//         setLoans([...loans, newLoan]);
//         setLoanType("");
//         setAmount("");
//         setFile(null);
//         alert("Loan application submitted successfully!");
//     };

//     const approveLoan = (id) => {
//         setLoans(loans.map(loan => loan.id === id ? { ...loan, status: "Approved" } : loan));
//     };

//     return (
//         <div className="dashboard">
//             <h2>User Dashboard</h2>

//             {/* Loan Tracking Section */}
//             <div className="loan-tracking">
//                 <h3>Your Loan Applications</h3>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Loan Type</th>
//                             <th>Amount</th>
//                             <th>Status</th>
//                             <th>Date</th>
//                             <th>Document</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {loans.map((loan) => (
//                             <tr key={loan.id}>
//                                 <td>{loan.type}</td>
//                                 <td>${loan.amount}</td>
//                                 <td className={loan.status === "Approved" ? "approved" : "pending"}>{loan.status}</td>
//                                 <td>{loan.date}</td>
//                                 <td>
//                                     <a href={`#${loan.document}`} target="_blank" rel="noopener noreferrer">
//                                         {loan.document}
//                                     </a>
//                                 </td>
//                                 <td>
//                                     {loan.status === "Pending" && (
//                                         <button className="approve-btn" onClick={() => approveLoan(loan.id)}>Approve</button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Apply for a Loan Section */}
//             <div className="apply-loan">
//                 <h3>Apply for a New Loan</h3>
//                 <form onSubmit={applyForLoan}>
//                     <select value={loanType} onChange={(e) => setLoanType(e.target.value)} required>
//                         <option value="">Select Loan Type</option>
//                         <option value="Home Loan">Home Loan</option>
//                         <option value="Car Loan">Car Loan</option>
//                         <option value="Personal Loan">Personal Loan</option>
//                         <option value="Education Loan">Education Loan</option>
//                     </select>
//                     <input
//                         type="number"
//                         placeholder="Enter Loan Amount"
//                         value={amount}
//                         onChange={(e) => setAmount(e.target.value)}
//                         required
//                     />
//                     <input type="file" onChange={handleFileUpload} required />
//                     <button type="submit">Apply Now</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UserDashboard;
