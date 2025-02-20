import React, { useState } from 'react';
import './LoanCalculator.css';

const LoanCalculator = () => {
    const [amount, setAmount] = useState('');
    const [interest, setInterest] = useState('');
    const [tenure, setTenure] = useState('');
    const [emi, setEmi] = useState(null);

    const calculateEMI = () => {
        let r = interest / 12 / 100;
        let n = tenure * 12;
        let emiValue = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setEmi(emiValue.toFixed(2));
    };

    return (
        <div className="calculator">
            <h1>Loan EMI Calculator</h1>
            <input type="number" placeholder="Loan Amount" onChange={(e) => setAmount(e.target.value)} />
            <input type="number" placeholder="Interest Rate (%)" onChange={(e) => setInterest(e.target.value)} />
            <input type="number" placeholder="Tenure (Years)" onChange={(e) => setTenure(e.target.value)} />
            <button onClick={calculateEMI}>Calculate</button>
            {emi && <h3>Estimated EMI: ₹{emi}/month</h3>}
        </div>
    );
};

export default LoanCalculator;
