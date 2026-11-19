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

const MERCHANT_TAB_TO_PAGE = {
  dashboard: 'MerchantDashboard',
  products: 'ManageProductInfo',
  'add-product': 'AddProductInfo',
  inventory: 'InventoryManage',
  orders: 'OrderManage',
  'order-details': 'OrderDetails',
  payments: 'PaymentManagement',
  store: 'StoreManagement',
  'social-media': 'SMCP',
  settings: 'MerchantProfile',
};

const ADMIN_TAB_TO_PAGE = {
  dashboard: 'AdminDashboard',
  users: 'UserManage',
  merchants: 'MerchantManage',
  products: 'ProductMonitor',
  orders: 'OrderMonitor',
};

const INITIAL_MERCHANT_PRODUCTS = [
  { id: 1, name: 'Everyday Tote Bag', category: 'Fashion', price: 450, stock: 24 },
  { id: 2, name: 'Wireless Mini Speaker', category: 'Electronics', price: 799, stock: 3 },
  { id: 3, name: 'Handmade Soy Candle', category: 'Home & Living', price: 299, stock: 18 },
  { id: 4, name: 'Organic Gift Set', category: 'Beauty', price: 650, stock: 4 },
  { id: 5, name: 'Canvas Sneakers', category: 'Fashion', price: 1499, stock: 12 },
  { id: 6, name: 'Mini Ring Light', category: 'Electronics', price: 599, stock: 0 },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('Login');
  const [userSession, setUserSession] = useState(null);
  const [merchantProducts, setMerchantProducts] = useState(INITIAL_MERCHANT_PRODUCTS);

  const navigateMerchant = (target) => {
    setCurrentPage(MERCHANT_TAB_TO_PAGE[target] || target);
  };

  const navigateAdmin = (target) => {
    setCurrentPage(ADMIN_TAB_TO_PAGE[target] || target);
  };

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
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateCart={() => setCurrentPage('Cart')}
            onNavigateProfile={() => setCurrentPage('CustomerProfile')}
            onNavigateOrders={() => setCurrentPage('MyOrders')}
          />
        );
      case 'Shop':
        return (
          <Shop
            user={userSession}
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateCart={() => setCurrentPage('Cart')}
            onNavigateProfile={() => setCurrentPage('CustomerProfile')}
            onNavigateOrders={() => setCurrentPage('MyOrders')}
            onLogout={handleLogout}
          />
        );
      case 'Cart':
        return (
          <Cart
            user={userSession}
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateCart={() => setCurrentPage('Cart')}
            onNavigateProfile={() => setCurrentPage('CustomerProfile')}
            onNavigateOrders={() => setCurrentPage('MyOrders')}
            onNavigateCheckout={() => setCurrentPage('Checkout')}
            onLogout={handleLogout}
          />
        );
      case 'Checkout':
        return (
          <Checkout
            user={userSession}
            onNavigateCart={() => setCurrentPage('Cart')}
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateProfile={() => setCurrentPage('CustomerProfile')}
            onNavigateOrders={() => setCurrentPage('MyOrders')}
            onNavigatePayment={() => setCurrentPage('Payment')}
            onLogout={handleLogout}
          />
        );
      case 'Payment':
        return (
          <Payment
            user={userSession}
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateCart={() => setCurrentPage('Cart')}
            onNavigateProfile={() => setCurrentPage('CustomerProfile')}
            onNavigateOrders={() => setCurrentPage('MyOrders')}
            onNavigateCheckout={() => setCurrentPage('Checkout')}
            onNavigateConfirmOrder={() => setCurrentPage('OrderConfirm')}
            onLogout={handleLogout}
          />
        );
      case 'CustomerProfile':
        return (
          <CustomerProfile
            user={userSession}
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateCart={() => setCurrentPage('Cart')}
            onNavigateProfile={() => setCurrentPage('CustomerProfile')}
            onNavigateOrders={() => setCurrentPage('MyOrders')}
            onLogout={handleLogout}
          />
        );
      case 'MyOrders':
        return (
          <MyOrders
            user={userSession}
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateCart={() => setCurrentPage('Cart')}
            onNavigateProfile={() => setCurrentPage('CustomerProfile')}
            onNavigateOrders={() => setCurrentPage('MyOrders')}
            onSelectOrder={() => setCurrentPage('OrderTracker')}
            onLogout={handleLogout}
          />
        );
      case 'OrderConfirm':
        return (
          <OrderConfirm
            user={userSession}
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateCart={() => setCurrentPage('Cart')}
            onNavigateProfile={() => setCurrentPage('CustomerProfile')}
            onNavigateOrders={() => setCurrentPage('MyOrders')}
            onNavigateTrackOrder={() => setCurrentPage('OrderTracker')}
            onLogout={handleLogout}
          />
        );
      case 'OrderTracker':
        return (
          <OrderTracker
            user={userSession}
            onNavigateHome={() => setCurrentPage('Dashboard')}
            onNavigateShop={() => setCurrentPage('Shop')}
            onNavigateCart={() => setCurrentPage('Cart')}
            onNavigateProfile={() => setCurrentPage('CustomerProfile')}
            onNavigateOrders={() => setCurrentPage('MyOrders')}
            onLogout={handleLogout}
          />
        );

      // --- MERCHANT ROUTES ---
      case 'MerchantDashboard':
        return (
          <MerchantDashboard
            user={userSession}
            onLogout={handleLogout}
            onNavigate={navigateMerchant}
          />
        );
      case 'AddProductInfo':
        return (
          <AddProductInfo
            onLogout={handleLogout}
            onNavigate={navigateMerchant}
            onBack={() => setCurrentPage('ManageProductInfo')}
            onSave={(product) => {
              setMerchantProducts((currentProducts) => [
                ...currentProducts,
                { ...product, id: Date.now() },
              ]);
              setCurrentPage('ManageProductInfo');
            }}
          />
        );
      case 'ManageProductInfo':
        return (
          <ManageProductInfo
            products={merchantProducts}
            onAddProduct={() => setCurrentPage('AddProductInfo')}
            onDeleteProduct={(productId) => {
              setMerchantProducts((currentProducts) =>
                currentProducts.filter((product) => product.id !== productId),
              );
            }}
            onLogout={handleLogout}
            onNavigate={navigateMerchant}
            onBack={() => setCurrentPage('MerchantDashboard')}
          />
        );
      case 'InventoryManage':
        return (
          <InventoryManage
            onLogout={handleLogout}
            onNavigate={navigateMerchant}
            onBack={() => setCurrentPage('MerchantDashboard')}
          />
        );
      case 'OrderManage':
        return (
          <OrderManage
            onLogout={handleLogout}
            onNavigate={navigateMerchant}
            onSelectOrder={() => setCurrentPage('OrderDetails')}
            onBack={() => setCurrentPage('MerchantDashboard')}
          />
        );
      case 'OrderDetails':
        return (
          <OrderDetails
            onLogout={handleLogout}
            onNavigate={navigateMerchant}
            onBack={() => setCurrentPage('OrderManage')}
          />
        );
      case 'MerchantProfile':
        return (
          <MerchantProfile
            user={userSession}
            onLogout={handleLogout}
            onNavigate={navigateMerchant}
            onBack={() => setCurrentPage('MerchantDashboard')}
          />
        );
      case 'StoreManagement':
        return (
          <StoreManagement
            onLogout={handleLogout}
            onNavigate={navigateMerchant}
            onBack={() => setCurrentPage('MerchantDashboard')}
          />
        );

      // --- ADMIN ROUTES ---
      case 'AdminDashboard':
        return (
          <AdminDash
            user={userSession}
            onLogout={handleLogout}
            onNavigate={navigateAdmin}
          />
        );
      case 'UserManage':
        return (
          <UserManage
            onLogout={handleLogout}
            onNavigate={navigateAdmin}
            onBack={() => setCurrentPage('AdminDashboard')}
          />
        );
      case 'MerchantManage':
        return (
          <MerchantManage
            onLogout={handleLogout}
            onNavigate={navigateAdmin}
            onBack={() => setCurrentPage('AdminDashboard')}
          />
        );
      case 'ProductMonitor':
        return (
          <ProductMonitor
            onLogout={handleLogout}
            onNavigate={navigateAdmin}
            onBack={() => setCurrentPage('AdminDashboard')}
          />
        );
      case 'OrderMonitor':
        return (
          <OrderMonitor
            onLogout={handleLogout}
            onNavigate={navigateAdmin}
            onBack={() => setCurrentPage('AdminDashboard')}
          />
        );
      case 'PaymentManagement':
        return (
          <PaymentManagement
            onLogout={handleLogout}
            onNavigate={navigateMerchant}
            onBack={() => setCurrentPage('MerchantDashboard')}
          />
        );
      case 'SMCP':
        return (
          <SMCP
            onLogout={handleLogout}
            onNavigate={navigateMerchant}
            onBack={() => setCurrentPage('MerchantDashboard')}
          />
        );

      default:
        return <Login onAuthSuccess={handleAuthSuccess} />;
    }
  };

  return renderPage();
}