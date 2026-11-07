import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Customer Pages Styling/index.css'
import App from './Customer Pages jsx/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// Select the lines of code then crtl + "/" to comment or uncomment the codes
// code above is for the customer pages, code below is for the merchant pages
// make sure to crtl + C to end the server, save the changes, then run "npm run dev" to start the server again


// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './Customer Pages Styling/index.css';
// import MerchantDashboard from './Merchant Pages jsx/MerchantDashboard.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <MerchantDashboard />
//   </StrictMode>,
// );