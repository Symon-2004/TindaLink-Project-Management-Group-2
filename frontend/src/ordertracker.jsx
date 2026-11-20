import { useState } from 'react';
import './ordertracker.css';
import CustomerNavbar from './CustomerNavbar.jsx';

const TIMELINE_STEPS = [
  {
    id: 1,
    title: 'Order placed',
    time: 'Sep 9 · 7:42 PM',
    status: 'completed', // 'completed' | 'current' | 'upcoming'
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
  user,
  orderNumber = 'TL-20260909-00124',
  customerName = 'Peachy Mangaoang',
  paymentStatus = 'Pending verification',
  totalAmount = 2048,
  deliveryMethod = 'Standard delivery',
  onNavigateOrders,
  onNavigateHome,
  onNavigateShop,
  onNavigateCart,
  onNavigateProfile,
  onLogout,
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
      <CustomerNavbar
        user={user}
        backAction={{
          label: '← Back to Orders',
          onClick: () => {
            if (onNavigateOrders) onNavigateOrders();
            else if (onNavigateHome) onNavigateHome();
          },
        }}
        onNavigateHome={onNavigateHome}
        onNavigateShop={onNavigateShop}
        onNavigateCart={onNavigateCart}
        onNavigateProfile={onNavigateProfile}
        onNavigateOrders={onNavigateOrders}
        onLogout={onLogout}
      />

      {/* 2. MAIN TRACKING CONTENT */}
      <main className="ordertracker-main">
        {/* Title Area */}
        <div className="ordertracker-header-area">
          <h1 className="ordertracker-title">Order Details &amp; Tracking</h1>
          <p className="ordertracker-subtitle">
            Order {orderNumber} · Keep an eye on your delivery status.
          </p>
        </div>

        {/* 2-Column Content Layout */}
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

            {/* Contact Seller button */}
            <button
              type="button"
              className="ordertracker-contact-btn"
              onClick={() => setShowContactModal(true)}
            >
              Contact Seller
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