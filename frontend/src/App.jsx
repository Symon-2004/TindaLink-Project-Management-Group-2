import { useState } from 'react';

//Customer Pages Imports
import Login from './Customer Pages jsx/Login.jsx';
import Dashboard from './Customer Pages jsx/Dashboard.jsx';
import Shop from './Customer Pages jsx/Shop.jsx';
import Cart from './Customer Pages jsx/Cart.jsx';
import Checkout from './Customer Pages jsx/checkout.jsx';
import Payment from './Customer Pages jsx/Payment.jsx';
import CustomerProfile from './Customer Pages jsx/customerprofile.jsx';
import MyOrders from './Customer Pages jsx/myorders.jsx';
import OrderConfirm from './Customer Pages jsx/orderconfirm.jsx';
import OrderTracker from './Customer Pages jsx/ordertracker.jsx';

// Merchant Pages Imports
import MerchantDashboard from './Merchant Pages jsx/MerchantDashboard.jsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [userSession, setUserSession] = useState({
    email: 'peachy@email.com',
    role: 'customer',
  });
  const isMerchant = userSession?.role === 'merchant';

  const handleLogout = () => {
    setUserSession(null);
    setCurrentPage('Login');
  };

  const handleAuthSuccess = (user) => {
    setUserSession(user);
    setCurrentPage(user.role === 'merchant' ? 'MerchantDashboard' : 'Dashboard');
  };

  const renderPage = () => {
    if (!userSession || !['customer', 'merchant'].includes(userSession.role) || currentPage === 'Login') {
      return <Login onAuthSuccess={handleAuthSuccess} />;
    }

    if (isMerchant) {
      return <MerchantDashboard onLogout={handleLogout} />;
    }

    switch (currentPage) {
      case 'Dashboard':
        return (
          <Dashboard
            user={userSession}
            onLogout={handleLogout}
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateCart={() => setCurrentPage('Cart')}
            onNavigateProfile={() => setCurrentPage('CustomerProfile')}
            onNavigateOrders={() => setCurrentPage('MyOrders')}
          />
        );
      case 'Shop':
        return (
          <Shop
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateCart={() => setCurrentPage('Cart')}
            onNavigateProfile={() => setCurrentPage('CustomerProfile')}
            onLogout={handleLogout}
          />
        );
      case 'Cart':
        return (
          <Cart
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateCheckout={() => setCurrentPage('Checkout')}
          />
        );
      case 'Checkout':
        return (
          <Checkout
            onNavigateCart={() => setCurrentPage('Cart')}
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigatePayment={() => setCurrentPage('Payment')}
          />
        );
      case 'Payment':
        return (
          <Payment
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateCheckout={() => setCurrentPage('Checkout')}
            onNavigateConfirmOrder={() => setCurrentPage('OrderConfirm')}
          />
        );
      case 'CustomerProfile':
        return (
          <CustomerProfile
            user={userSession}
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateOrders={() => setCurrentPage('MyOrders')}
            onLogout={handleLogout}
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
        return (
          <Dashboard
            user={userSession}
            onLogout={handleLogout}
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateCart={() => setCurrentPage('Cart')}
            onNavigateProfile={() => setCurrentPage('CustomerProfile')}
            onNavigateOrders={() => setCurrentPage('MyOrders')}
          />
        );
    }
  };

  const pageOptions = userSession
    ? isMerchant
      ? ['MerchantDashboard', 'Login']
      : [
          'Dashboard',
          'Login',
          'Shop',
          'Cart',
          'Checkout',
          'Payment',
          'CustomerProfile',
          'MyOrders',
          'OrderConfirm',
          'OrderTracker',
        ]
    : ['Login'];

  return (
    <div>
      {/* Floating Dev Switcher (Persisted for quick preview & testing) */}
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
