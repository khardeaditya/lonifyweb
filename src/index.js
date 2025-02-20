import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import './styles/index.css';  // Ensure this file exists for global styles

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
        <>
            <App />
        </>
);
