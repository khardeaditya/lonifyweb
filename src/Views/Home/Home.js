import React from 'react';
import './Home.css';
// import LoanTypes from '../Loans/LoanTypes/LoanTypes';
import LoanComparison from '../Loans/LoanComparison/LoanComparison';
import LoanCalculator from '../Loans/LoanCalculator/LoanCalculator';
import Navbar from '../../components/NavBar/NavBar';
const Home = () => {
    return (
        <>
        <Navbar />
        <div className="home">
                        
            <h1>Welcome to Loan Hub</h1>
         <LoanComparison />
        <LoanCalculator />
        {/* <LoanTypes /> */}

            <p>Your trusted platform for quick and easy loans.</p>
        </div>
        </>
    );
};

export default Home;
