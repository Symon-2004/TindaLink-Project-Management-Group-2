// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import '../Customer Pages Styling/index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// Select Lines of code then crtl + / to comment/uncomment the codes
// code above is for the customer pages, code below is for the merchant pages


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../Customer Pages Styling/index.css';
import MerchantDashboard from '../Merchant Pages jsx/MerchantDashboard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MerchantDashboard />
  </StrictMode>,
);