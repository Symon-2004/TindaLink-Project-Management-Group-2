import { useState } from 'react';
import '../Customer Pages Styling/myorders.css';

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
  onSelectOrder,
  onNavigateHome,
  onNavigateShop,
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
      {/* 1. TOP NAVBAR (TindaLink logo without AI badge) */}
      <header className="myorders-navbar">
        <div className="myorders-navbar-container">
          <div
            className="myorders-logo"
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
            }}
          >
            <div className="myorders-logo-icon">
              <svg viewBox="0 0 36 36" fill="none">
                <rect x="4" y="4" width="28" height="28" rx="8" fill="url(#ordersGrad)" />
                <path
                  d="M13 13V11C13 9 15 7 18 7C21 7 23 9 23 11V13"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <rect x="9" y="13" width="18" height="15" rx="3" fill="white" />
                <path
                  d="M14 17C14 19 16 20.5 18 20.5C20 20.5 22 19 22 17"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="ordersGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" />
                    <stop offset="0.55" stopColor="#8B5CF6" />
                    <stop offset="1" stopColor="#D946EF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="myorders-logo-text">
              Tinda<span className="myorders-logo-accent">Link</span>
            </span>
          </div>

          <div className="myorders-nav-actions">
            <button
              type="button"
              className="myorders-nav-btn"
              onClick={() => {
                if (onNavigateShop) onNavigateShop();
                else if (onNavigateHome) onNavigateHome();
              }}
            >
              Shop More
            </button>
          </div>
        </div>
      </header>

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