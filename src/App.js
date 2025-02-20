import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './Views/Home/Home';
import LoanApplication from './Views/LoanApplication/LoanApplication';
import LoanCalculator from './Views/LoanCalculator/LoanCalculator';
import LoanTypes from './Views/LoanTypes/LoanTypes';
import Contact from './Views/Contact/Contact';
import UserDashboard from './Views/UserDashboard/UserDashboard';
import EMIPayment from "./Views/EMIPayment/EMIPayment";
import LoanComparison from "./Views/LoanComparison/LoanComparison";
import LoanEligibility from "./Views/LoanEligibility/LoanEligibility";
import Login from "./Views/UserLogin/Login";
import Register from "./Views/Register/Register";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/apply" element={<LoanApplication />} />
                <Route path="/calculator" element={<LoanCalculator />} />
                <Route path="/types" element={<LoanTypes />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/emi-payment" element={<EMIPayment />} />
                <Route path="/loan-comparison" element={<LoanComparison />} />
                <Route path="/loan-eligibility" element={<LoanEligibility />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
  
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
