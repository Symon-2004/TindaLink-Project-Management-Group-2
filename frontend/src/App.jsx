import { useState } from 'react';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Shop from './Shop.jsx';
import Cart from './Cart.jsx';
import Checkout from './checkout.jsx';
import Payment from './Payment.jsx';
import CustomerProfile from './customerprofile.jsx';
import MyOrders from './myorders.jsx';
import OrderConfirm from './orderconfirm.jsx';
import OrderTracker from './ordertracker.jsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [userSession, setUserSession] = useState({ email: 'peachy@email.com' });

  const renderPage = () => {
    switch (currentPage) {
      case 'Login':
        return (
          <Login
            onAuthSuccess={(user) => {
              setUserSession(user);
              setCurrentPage('Dashboard');
            }}
          />
        );
      case 'Dashboard':
        return (
          <Dashboard
            user={userSession}
            onLogout={() => {
              setUserSession(null);
              setCurrentPage('Login');
            }}
          />
        );
      case 'Shop':
        return (
          <Shop
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onLogout={() => {
              setUserSession(null);
              setCurrentPage('Login');
            }}
          />
        );
      case 'Cart':
        return (
          <Cart
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateHome={() => setCurrentPage('Dashboard')}
          />
        );
      case 'Checkout':
        return (
          <Checkout
            onNavigateCart={() => setCurrentPage('Cart')}
            onNavigateHome={() => setCurrentPage('Dashboard')}
          />
        );
      case 'Payment':
        return (
          <Payment
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateCheckout={() => setCurrentPage('Checkout')}
          />
        );
      case 'CustomerProfile':
        return (
          <CustomerProfile
            user={userSession}
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateOrders={() => setCurrentPage('MyOrders')}
            onLogout={() => {
              setUserSession(null);
              setCurrentPage('Login');
            }}
          />
        );
      case 'MyOrders':
        return (
          <MyOrders
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateShop={() => setCurrentPage('Shop')}
            onSelectOrder={() => setCurrentPage('OrderTracker')}
          />
        );
      case 'OrderConfirm':
        return (
          <OrderConfirm
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateTrackOrder={() => setCurrentPage('OrderTracker')}
          />
        );
      case 'OrderTracker':
        return (
          <OrderTracker
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateOrders={() => setCurrentPage('MyOrders')}
          />
        );
      default:
        return <Dashboard onLogout={() => setCurrentPage('Login')} />;
    }
  };

  const pageOptions = [
    'Dashboard',
    'Login',
    'Shop',
    'Cart',
    'Checkout',
    'Payment',
    'CustomerProfile',
    'MyOrders',
    'OrderConfirm',
    'OrderTracker'
  ];

  return (
    <div>
      {/* Floating Dev Switcher */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 999999,
          background: '#18181b',
          color: '#f4f4f5',
          padding: '10px 14px',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '13px',
          border: '1px solid #3f3f46'
        }}
      >
        <span style={{ fontWeight: '600', color: '#c084fc' }}>Dev Preview:</span>
        <select
          value={currentPage}
          onChange={(e) => setCurrentPage(e.target.value)}
          style={{
            background: '#27272a',
            color: '#f4f4f5',
            border: '1px solid #52525b',
            borderRadius: '6px',
            padding: '5px 10px',
            fontSize: '13px',
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          {pageOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Render Active Page */}
      {renderPage()}
    </div>
  );
}
