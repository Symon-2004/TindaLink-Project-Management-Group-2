import { useState } from 'react';
import './ordertracker.css';

const TIMELINE_STEPS = [
  {
    id: 1,
    title: 'Order placed',
    time: 'Sep 9 · 7:42 PM',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Payment verified',
    time: 'Waiting',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Processing',
    time: 'Waiting',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Shipped',
    time: 'Waiting',
    status: 'upcoming',
  },
  {
    id: 5,
    title: 'Completed',
    time: '',
    status: 'upcoming',
  },
];

const ORDER_ITEMS = [
  {
    id: 1,
    name: 'Everyday Tote Bag',
    qty: 1,
    price: 450,
  },
  {
    id: 2,
    name: 'Wireless Mini Speaker',
    qty: 2,
    price: 1598,
  },
];

export default function OrderTracker({
  orderNumber = 'TL-20260909-00124',
  customerName = 'Peachy Mangaoang',
  paymentStatus = 'Pending verification',
  totalAmount = 2048,
  deliveryMethod = 'Standard delivery',
  onNavigateOrders,
  onNavigateHome,
}) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [inquiryText, setInquiryText] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleSendInquiry = (e) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryText('');
      setShowContactModal(false);
      alert('Your inquiry was sent to the merchant! They will reply via your registered email/phone.');
    }, 700);
  };

  return (
    <div className="ordertracker-page">
      {/* 1. TOP NAVBAR (TindaLink logo without AI badge) */}
      <header className="ordertracker-navbar">
        <div className="ordertracker-navbar-container">
          <div
            className="ordertracker-logo"
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
            }}
          >
            <div className="ordertracker-logo-icon">
              <svg viewBox="0 0 36 36" fill="none">
                <rect x="4" y="4" width="28" height="28" rx="8" fill="url(#trackerGrad)" />
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
                  <linearGradient id="trackerGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" />
                    <stop offset="0.55" stopColor="#8B5CF6" />
                    <stop offset="1" stopColor="#D946EF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="ordertracker-logo-text">
              Tinda<span className="ordertracker-logo-accent">Link</span>
            </span>
          </div>

          <div className="ordertracker-nav-actions">
            <button
              type="button"
              className="ordertracker-back-btn"
              onClick={() => {
                if (onNavigateOrders) onNavigateOrders();
                else if (onNavigateHome) onNavigateHome();
              }}
            >
              ← Back to Orders
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN TRACKING CONTENT */}
      <main className="ordertracker-main">
        {/* Title Area */}
        <div className="ordertracker-header-area">
          <h1 className="ordertracker-title">Order Details &amp; Tracking</h1>
          <p className="ordertracker-subtitle">
            Order {orderNumber} · Keep an eye on your delivery status.
          </p>
        </div>

        {/* 2-Column Content Layout (Matching Frame 25) */}
        <div className="ordertracker-content-layout">
          {/* Left Column: Order Status + Order Information Card */}
          <div className="ordertracker-left-card">
            <h2 className="ordertracker-card-heading">Order Status</h2>

            <div className="ordertracker-status-split">
              {/* Vertical Tracking Timeline */}
              <div className="ordertracker-timeline">
                {TIMELINE_STEPS.map((step, index) => {
                  const isCompleted = step.status === 'completed';
                  const isLast = index === TIMELINE_STEPS.length - 1;

                  return (
                    <div key={step.id} className="ordertracker-timeline-item">
                      <div className="ordertracker-timeline-left">
                        <div
                          className={`ordertracker-dot ${
                            isCompleted ? 'ordertracker-dot-active' : 'ordertracker-dot-inactive'
                          }`}
                        />
                        {!isLast && <div className="ordertracker-timeline-line" />}
                      </div>

                      <div className="ordertracker-timeline-content">
                        <span className={`ordertracker-step-title ${isCompleted ? 'active-text' : ''}`}>
                          {step.title}
                        </span>
                        {step.time && (
                          <span className="ordertracker-step-time">{step.time}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Information Nested Card */}
              <div className="ordertracker-info-box">
                <h3 className="ordertracker-info-heading">Order information</h3>

                <div className="ordertracker-info-row">
                  <span className="ordertracker-info-label">Customer</span>
                  <span className="ordertracker-info-value">{customerName}</span>
                </div>

                <div className="ordertracker-info-row">
                  <span className="ordertracker-info-label">Payment</span>
                  <span className="ordertracker-info-value">{paymentStatus}</span>
                </div>

                <div className="ordertracker-info-row">
                  <span className="ordertracker-info-label">Total</span>
                  <span className="ordertracker-info-value ordertracker-total-highlight">
                    ₱ {totalAmount.toLocaleString()}
                  </span>
                </div>

                <div className="ordertracker-info-row">
                  <span className="ordertracker-info-label">Delivery</span>
                  <span className="ordertracker-info-value">{deliveryMethod}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Items Card */}
          <aside className="ordertracker-right-card">
            <h2 className="ordertracker-card-heading">Items</h2>

            {/* List of items */}
            <div className="ordertracker-items-list">
              {ORDER_ITEMS.map((item) => (
                <div key={item.id} className="ordertracker-item-row">
                  <span className="ordertracker-item-name">
                    {item.name} ×{item.qty}
                  </span>
                  <span className="ordertracker-item-price">
                    ₱ {item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact Seller / Ask AI button */}
            <button
              type="button"
              className="ordertracker-contact-btn"
              onClick={() => setShowContactModal(true)}
            >
              Contact seller / Ask AI
            </button>
          </aside>
        </div>
      </main>

      {/* Contact Seller Modal */}
      {showContactModal && (
        <div className="ordertracker-modal-backdrop" onClick={() => setShowContactModal(false)}>
          <div className="ordertracker-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ordertracker-modal-header">
              <h3>Contact Seller regarding {orderNumber}</h3>
              <button
                type="button"
                className="ordertracker-modal-close"
                onClick={() => setShowContactModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSendInquiry}>
              <p className="ordertracker-modal-desc">
                Have a question about order fulfillment, tracking updates, or special delivery instructions? Send a message directly to the seller.
              </p>

              <textarea
                required
                rows={4}
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="Type your message or delivery note here..."
                className="ordertracker-modal-textarea"
              />

              <div className="ordertracker-modal-actions">
                <button
                  type="button"
                  className="ordertracker-modal-cancel"
                  onClick={() => setShowContactModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inquirySent}
                  className="ordertracker-modal-submit"
                >
                  {inquirySent ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}