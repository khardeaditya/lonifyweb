import React, { useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './UserDashboard.css';

const UserDashboard = () => {
    const [user] = useState({
        name: "Aditya",
        loanAmount: 500000,
        interestRate: 7.5,
        tenure: 5,
        status: "Approved",
    });

    // Calculate EMI
    const calculateEMI = () => {
        let principal = user.loanAmount;
        let rate = user.interestRate / 12 / 100;
        let months = user.tenure * 12;
        let emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
        return emi.toFixed(2);
    };

    // Generate Loan Progress Data
    const loanProgress = [];
    let remainingBalance = user.loanAmount;
    for (let i = 1; i <= user.tenure; i++) {
        remainingBalance -= user.loanAmount / user.tenure;
        loanProgress.push({ year: `Year ${i}`, balance: Math.max(remainingBalance, 0) });
    }

    // PDF Download Function
    const pdfRef = useRef();

    const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.save("Loan_Statement.pdf");
        });
    };

    return (
        <div className="dashboard">
            <h1>Welcome, {user.name}!</h1>

            {/* Loan Summary & PDF Section */}
            <div className="dashboard-info" ref={pdfRef}>
                <h3>Loan Summary</h3>
                <p><strong>Loan Amount:</strong> ₹{user.loanAmount}</p>
                <p><strong>Interest Rate:</strong> {user.interestRate}%</p>
                <p><strong>Tenure:</strong> {user.tenure} years</p>
                <p><strong>Estimated EMI:</strong> ₹{calculateEMI()} per month</p>
                <p><strong>Loan Status:</strong> <span className={user.status.toLowerCase()}>{user.status}</span></p>
            </div>

            {/* Download PDF Button */}
            <button className="download-btn" onClick={downloadPDF}>Download Loan Statement (PDF)</button>

            {/* Loan Progress Chart */}
            <div className="chart-container">
                <h3>Loan Repayment Progress</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={loanProgress}>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="balance" stroke="#007bff" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UserDashboard;



// import React, { useState } from 'react';
// import './UserDashboard.css';

// const UserDashboard = () => {
//     // Dummy user data
//     const [user, setUser] = useState({
//         name: "Aditya",
//         email: "aditya@example.com",
//         phone: "9876543210",
//         loanAmount: 500000,
//         interestRate: 7.5,
//         tenure: 5,
//         status: "Approved",
//     });

//     // EMI Calculation
//     const calculateEMI = () => {
//         let principal = user.loanAmount;
//         let rate = user.interestRate / 12 / 100;
//         let months = user.tenure * 12;
//         let emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
//         return emi.toFixed(2);
//     };

//     // Handle Input Change
//     const handleChange = (e) => {
//         setUser({ ...user, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className="dashboard">
//             <h1>Welcome, {user.name}!</h1>

//             {/* Profile Section */}
//             <div className="profile">
//                 <h3>User Profile</h3>
//                 <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Your Name" />
//                 <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
//                 <input type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone Number" />
//             </div>

//             {/* Loan Summary Section */}
//             <div className="dashboard-info">
//                 <h3>Loan Summary</h3>
//                 <p><strong>Loan Amount:</strong> ₹{user.loanAmount}</p>
//                 <p><strong>Interest Rate:</strong> {user.interestRate}%</p>
//                 <p><strong>Tenure:</strong> {user.tenure} years</p>
//                 <p><strong>Estimated EMI:</strong> ₹{calculateEMI()} per month</p>
//                 <p><strong>Loan Status:</strong> <span className={user.status.toLowerCase()}>{user.status}</span></p>
//             </div>
//         </div>
//     );
// };

// export default UserDashboard;
