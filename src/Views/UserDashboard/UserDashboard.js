import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

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
            const requests = JSON.parse(localStorage.getItem("loanRequests")) || [];
            setLoanRequests(requests.filter((req) => req.userEmail === authUser.email));
        }
    }, [navigate]);

    return (
        <div className="user-dashboard">
            <h2>Welcome, {user?.name}</h2>
            <p>Email: {user?.email}</p>
            <button onClick={() => navigate("/apply-loan")}>Apply for a Loan</button>

            <h3>Your Loan Requests</h3>
            <table>
                <thead>
                    <tr>
                        <th>Loan Type</th>
                        <th>Amount</th>
                        <th>Income</th>
                        <th>Document</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loanRequests.map((loan) => (
                        <tr key={loan.id}>
                            <td>{loan.loanType}</td>
                            <td>${loan.loanAmount}</td>
                            <td>${loan.income}</td>
                            <td>{loan.documentName}</td>
                            <td>{loan.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDashboard;
