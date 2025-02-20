import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './Views/Home/Home';
import LoanApplication from './Views/Loans/LoanApplication/LoanApplication';
import LoanCalculator from './Views/Loans/LoanCalculator/LoanCalculator';
import LoanTypes from './Views/Loans/LoanTypes/LoanTypes';
import Contact from './Views/Contact/Contact';
import UserDashboard from './Views/UserDashboard/UserDashboard';
import LoanComparison from "./Views/Loans/LoanComparison/LoanComparison";
import LoanEligibility from "./Views/Loans/LoanEligibility/LoanEligibility";
import Login from "./Views/UserLogin/Login";
import Register from "./Views/Register/Register";
import UsersDashboard from './Views/UsersDash/UserDashboard';
import AdminLogin from './Views/AdminDashboard/AdminLogin/AdminLogin';
import AdminDashboard from './Views/AdminDashboard/AdminDashboard';
import UserProfile from './Views/UserProfile/UserProfile';
import LoanHistory from './Views/Loans/LoanHistory/LoanHistory';
import EMIPayment from './Views/EMIPayment/EMIPayment';
import AdminEMIPayments from './Views/AdminDashboard/AdminEMIPayments/AdminEMIPayments';
import PaymentHistory from './Views/PaymentHistory/PaymentHistory';
const App = () => {

    const [loanRequests, setLoanRequests] = useState([]);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

    useEffect(() => {
        const authStatus = localStorage.getItem("adminAuth");
        if (authStatus === "true") {
            setIsAdminAuthenticated(true);
        }
    }, []);



    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calculator" element={<LoanCalculator />} />
                <Route path="/types" element={<LoanTypes />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/loan-comparison" element={<LoanComparison />} />
                <Route path="/loan-eligibility" element={<LoanEligibility />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/payment-history" element={<PaymentHistory />} /> {/* New Route */}

             {/* //   <Route path="/user-dashboard" element={<UsersDashboard />} /> */}
             <Route path="/user-profile" element={<UserProfile />} />
             <Route path="/loan-history" element={<LoanHistory />} />
             <Route path="/emi-payment" element={<EMIPayment />} />
             <Route path="/admin-emi-payments" element={<AdminEMIPayments />} />

                <Route path="/user-dashboard" element={<UsersDashboard loanRequests={loanRequests} setLoanRequests={setLoanRequests} />} />
                <Route path="/admin-login" element={<AdminLogin setIsAdminAuthenticated={setIsAdminAuthenticated} />} />
                <Route path="/admin-dashboard" element={<AdminDashboard loanRequests={loanRequests} setLoanRequests={setLoanRequests} isAdminAuthenticated={isAdminAuthenticated} />} />
                <Route path="/apply-loan" element={<LoanApplication />} />

            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
