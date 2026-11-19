import { useState } from 'react';

// Customer Pages Imports
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

// Merchant & Admin Pages Imports
import MerchantDashboard from './Merchant Pages jsx/MerchantDashboard.jsx';
import AdminDash from './Merchant Pages jsx/AdminDash.jsx';
import AddProductInfo from './Merchant Pages jsx/AddProductInfo.jsx';
import ManageProductInfo from './Merchant Pages jsx/ManageProductInfo.jsx';
import InventoryManage from './Merchant Pages jsx/InventoryManage.jsx';
import OrderManage from './Merchant Pages jsx/OrderManage.jsx';
import OrderDetails from './Merchant Pages jsx/OrderDetails.jsx';
import OrderMonitor from './Merchant Pages jsx/OrderMonitor.jsx';
import ProductMonitor from './Merchant Pages jsx/ProductMonitor.jsx';
import PaymentManagement from './Merchant Pages jsx/PaymentManagement.jsx';
import StoreManagement from './Merchant Pages jsx/StoreManagement.jsx';
import MerchantManage from './Merchant Pages jsx/MerchantManage.jsx';
import MerchantProfile from './Merchant Pages jsx/MerchantProfile.jsx';
import UserManage from './Merchant Pages jsx/UserManage.jsx';
import SMCP from './Merchant Pages jsx/SMCP.jsx';

const CUSTOMER_PAGES = [
  'Dashboard',
  'Shop',
  'Cart',
  'Checkout',
  'Payment',
  'CustomerProfile',
  'MyOrders',
  'OrderConfirm',
  'OrderTracker',
];

const MERCHANT_PAGES = [
  'MerchantDashboard',
  'AddProductInfo',
  'ManageProductInfo',
  'InventoryManage',
  'OrderManage',
  'OrderDetails',
  'MerchantProfile',
  'StoreManagement',
];

const ADMIN_PAGES = [
  'AdminDashboard',
  'UserManage',
  'MerchantManage',
  'ProductMonitor',
  'OrderMonitor',
  'PaymentManagement',
  'SMCP',
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('Login');
  const [userSession, setUserSession] = useState(null);

  const isMerchant = userSession?.role === 'merchant';
  const isAdmin = userSession?.role === 'admin';

  const handleLogout = () => {
    setUserSession(null);
    setCurrentPage('Login');
  };

  const handleAuthSuccess = (user) => {
    setUserSession(user);
    const roleHomePages = {
      customer: 'Dashboard',
      merchant: 'MerchantDashboard',
      admin: 'AdminDashboard',
    };
    setCurrentPage(roleHomePages[user.role] || 'Dashboard');
  };

  const renderPage = () => {
    // Allow direct switching via Dev Preview even if userSession is null, unless explicitly on Login
    if (currentPage === 'Login') {
      return <Login onAuthSuccess={handleAuthSuccess} />;
    }

    switch (currentPage) {
      // --- CUSTOMER ROUTES ---
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

      // --- MERCHANT ROUTES ---
      case 'MerchantDashboard':
        return (
          <MerchantDashboard
            user={userSession}
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
          />
        );
      case 'AddProductInfo':
        return (
          <AddProductInfo
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('MerchantDashboard')}
          />
        );
      case 'ManageProductInfo':
        return (
          <ManageProductInfo
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('MerchantDashboard')}
          />
        );
      case 'InventoryManage':
        return (
          <InventoryManage
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('MerchantDashboard')}
          />
        );
      case 'OrderManage':
        return (
          <OrderManage
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            onSelectOrder={() => setCurrentPage('OrderDetails')}
            onBack={() => setCurrentPage('MerchantDashboard')}
          />
        );
      case 'OrderDetails':
        return (
          <OrderDetails
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('OrderManage')}
          />
        );
      case 'MerchantProfile':
        return (
          <MerchantProfile
            user={userSession}
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('MerchantDashboard')}
          />
        );
      case 'StoreManagement':
        return (
          <StoreManagement
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('MerchantDashboard')}
          />
        );

      // --- ADMIN ROUTES ---
      case 'AdminDashboard':
        return (
          <AdminDash
            user={userSession}
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
          />
        );
      case 'UserManage':
        return (
          <UserManage
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('AdminDashboard')}
          />
        );
      case 'MerchantManage':
        return (
          <MerchantManage
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('AdminDashboard')}
          />
        );
      case 'ProductMonitor':
        return (
          <ProductMonitor
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('AdminDashboard')}
          />
        );
      case 'OrderMonitor':
        return (
          <OrderMonitor
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('AdminDashboard')}
          />
        );
      case 'PaymentManagement':
        return (
          <PaymentManagement
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('AdminDashboard')}
          />
        );
      case 'SMCP':
        return (
          <SMCP
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('AdminDashboard')}
          />
        );

      default:
        return <Login onAuthSuccess={handleAuthSuccess} />;
    }
  };

  // Filter dropdown options by role when logged in, or show all pages when testing unauthenticated
  const availablePages = userSession
    ? isAdmin
      ? ['AdminDashboard', ...ADMIN_PAGES.slice(1), 'Login']
      : isMerchant
      ? ['MerchantDashboard', ...MERCHANT_PAGES.slice(1), 'Login']
      : [...CUSTOMER_PAGES, 'Login']
    : ['Login', ...CUSTOMER_PAGES, ...MERCHANT_PAGES, ...ADMIN_PAGES];

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
          border: '1px solid #3f3f46',
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
            outline: 'none',
          }}
        >
          {availablePages.map((name) => (
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