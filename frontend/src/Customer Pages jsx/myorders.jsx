import { useState } from 'react';
import '../Customer Pages Styling/myorders.css';
import CustomerNavbar from './CustomerNavbar.jsx';

const INITIAL_ORDERS = [
  {
    id: 'TL-20260909-00124',
    status: 'Pending',
    statusLabel: 'Pending Verification',
    statusColor: 'amber',
    itemsSummary: 'Everyday Tote Bag + 1 item',
    totalPrice: 2048,
    date: 'Sep 9, 2026',
  },
  {
    id: 'TL-20260907-00098',
    status: 'Processing',
    statusLabel: 'Processing',
    statusColor: 'blue',
    itemsSummary: 'Handmade Soy Candle',
    totalPrice: 299,
    date: 'Sep 7, 2026',
  },
  {
    id: 'TL-20260830-00071',
    status: 'Completed',
    statusLabel: 'Completed',
    statusColor: 'green',
    itemsSummary: 'Organic Gift Set',
    totalPrice: 650,
    date: 'Aug 30, 2026',
  },
];

const FILTER_TABS = [
  { key: 'All', label: 'All' },
  { key: 'Pending', label: 'Pending' },
  { key: 'Processing', label: 'Processing' },
  { key: 'Shipped', label: 'Shipped' },
  { key: 'Completed', label: 'Completed' },
  { key: 'Cancelled', label: 'Cancelled' },
];

export default function MyOrders({
  user,
  onSelectOrder,
  onNavigateHome,
  onNavigateShop,
  onNavigateCart,
  onNavigateProfile,
  onNavigateOrders,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState('All');
  const [orders] = useState(INITIAL_ORDERS);

  // Filter orders by tab
  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'All') return true;
    return order.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="myorders-page">
      <CustomerNavbar
        user={user}
        onNavigateHome={onNavigateHome}
        onNavigateShop={onNavigateShop}
        onNavigateCart={onNavigateCart}
        onNavigateProfile={onNavigateProfile}
        onNavigateOrders={onNavigateOrders}
        onLogout={onLogout}
      />

      {/* 2. MAIN ORDERS CONTENT */}
      <main className="myorders-main">
        {/* Title Area */}
        <div className="myorders-header-area">
          <h1 className="myorders-title">My Orders</h1>
          <p className="myorders-subtitle">
            Track current orders and view your purchase history.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="myorders-filters-row">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`myorders-filter-pill ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders Card Container (Matching CUS-08) */}
        <div className="myorders-card-wrapper">
          {filteredOrders.length > 0 ? (
            <div className="myorders-list">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="myorders-item-card"
                  onClick={() => {
                    if (onSelectOrder) onSelectOrder(order.id);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {/* Left Column: Order Number & Status */}
                  <div className="myorders-item-col-left">
                    <span className="myorders-order-number">{order.id}</span>
                    <span className={`myorders-status-badge status-${order.statusColor}`}>
                      {order.statusLabel}
                    </span>
                  </div>

                  {/* Middle Column: Items */}
                  <div className="myorders-item-col-center">
                    <span className="myorders-items-summary">{order.itemsSummary}</span>
                  </div>

                  {/* Right Column: Total Price */}
                  <div className="myorders-item-col-right">
                    <span className="myorders-price">
                      ₱ {order.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="myorders-empty-state">
              <div className="myorders-empty-icon">📦</div>
              <h3>No {activeTab.toLowerCase()} orders found</h3>
              <p>You have no orders currently in this category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}