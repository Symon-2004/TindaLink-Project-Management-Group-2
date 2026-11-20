import { useState } from 'react';
import Dashboard from './Dashboard.jsx';
import Shop from './Shop.jsx';
import Cart from './Cart.jsx';
import Checkout from './Checkout.jsx';
import Payment from './Payment.jsx';
import OrderConfirm from './orderconfirm.jsx';
import MyOrders from './myorders.jsx';
import OrderTracker from './ordertracker.jsx';
import CustomerProfile from './customerprofile.jsx';

export default function CustomerWorkspace({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('Home');
  const [cartCount, setCartCount] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState('All products');
  const [selectedOrderId, setSelectedOrderId] = useState('TL-20260909-00124');

  if (activeNav === 'Shop') {
    return (
      <Shop
        user={user}
        cartCount={cartCount}
        initialCategory={selectedCategory}
        onNavigateHome={() => setActiveNav('Home')}
        onNavigateCart={() => setActiveNav('Cart')}
        onNavigateOrders={() => setActiveNav('Orders')}
        onNavigateProfile={() => setActiveNav('Profile')}
        onAddToCart={() => setCartCount((c) => c + 1)}
        onLogout={onLogout}
      />
    );
  }

  if (activeNav === 'Cart') {
    return (
      <Cart
        onNavigateHome={() => setActiveNav('Home')}
        onNavigateShop={() => {
          setSelectedCategory('All products');
          setActiveNav('Shop');
        }}
        onNavigateCheckout={() => setActiveNav('Checkout')}
      />
    );
  }

  if (activeNav === 'Checkout') {
    return (
      <Checkout
        onNavigateHome={() => setActiveNav('Home')}
        onNavigateCart={() => setActiveNav('Cart')}
        onNavigatePayment={() => setActiveNav('Payment')}
      />
    );
  }

  if (activeNav === 'Payment') {
    return (
      <Payment
        totalAmount={2048}
        onNavigateHome={() => setActiveNav('Home')}
        onNavigateCheckout={() => setActiveNav('Checkout')}
        onNavigateOrderConfirm={() => setActiveNav('OrderConfirm')}
      />
    );
  }

  if (activeNav === 'OrderConfirm') {
    return (
      <OrderConfirm
        orderNumber={selectedOrderId}
        paymentStatus="Pending Verification"
        itemsSummary="Everyday Tote Bag ×1 · Wireless Mini Speaker ×2"
        totalAmount={2048}
        onNavigateTrackOrder={() => setActiveNav('OrderTracker')}
        onNavigateShop={() => {
          setSelectedCategory('All products');
          setActiveNav('Shop');
        }}
        onNavigateHome={() => setActiveNav('Home')}
      />
    );
  }

  if (activeNav === 'Orders') {
    return (
      <MyOrders
        onSelectOrder={(orderId) => {
          if (orderId) setSelectedOrderId(orderId);
          setActiveNav('OrderTracker');
        }}
        onNavigateHome={() => setActiveNav('Home')}
        onNavigateShop={() => {
          setSelectedCategory('All products');
          setActiveNav('Shop');
        }}
      />
    );
  }

  if (activeNav === 'OrderTracker') {
    return (
      <OrderTracker
        orderNumber={selectedOrderId}
        customerName={user?.name || 'Peachy Mangaoang'}
        paymentStatus="Pending verification"
        totalAmount={2048}
        deliveryMethod="Standard delivery"
        onNavigateOrders={() => setActiveNav('Orders')}
        onNavigateHome={() => setActiveNav('Home')}
      />
    );
  }

  if (activeNav === 'Profile') {
    return (
      <CustomerProfile
        user={user}
        onNavigateOrders={() => setActiveNav('Orders')}
        onNavigateHome={() => setActiveNav('Home')}
        onNavigateShop={() => {
          setSelectedCategory('All products');
          setActiveNav('Shop');
        }}
        onLogout={onLogout}
      />
    );
  }

  return (
    <Dashboard
      user={user}
      cartCount={cartCount}
      onNavigateShop={(category) => {
        setSelectedCategory(category || 'All products');
        setActiveNav('Shop');
      }}
      onNavigateCart={() => setActiveNav('Cart')}
      onNavigateOrders={() => setActiveNav('Orders')}
      onNavigateProfile={() => setActiveNav('Profile')}
      onAddToCart={() => setCartCount((c) => c + 1)}
      onLogout={onLogout}
    />
  );
}