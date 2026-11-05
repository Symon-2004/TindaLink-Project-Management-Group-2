import { useState } from 'react';
import './Checkout.css';

const DEFAULT_ORDER_ITEMS = [
  {
    id: 1,
    name: 'Everyday Tote Bag',
    qty: 1,
    unitPrice: 450,
    totalPrice: 450,
  },
  {
    id: 2,
    name: 'Wireless Mini Speaker',
    qty: 2,
    unitPrice: 799,
    totalPrice: 1598,
  },
];

export default function Checkout({ onNavigateCart, onNavigateHome }) {
  // Form state pre-filled as shown in CUS-05
  const [fullName, setFullName] = useState('Peachy Mahaleel M. Mangaoang');
  const [email, setEmail] = useState('peachy@email.com');
  const [contactNumber, setContactNumber] = useState('09xx xxx xxxx');
  const [addressLine, setAddressLine] = useState('Blk 2, Lot 10, Example Street');
  const [cityProvince, setCityProvince] = useState('Makati City, Metro Manila');

  const [orderItems] = useState(DEFAULT_ORDER_ITEMS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  // Calculate order total
  const totalAmount = orderItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPaymentSuccess(true);
    }, 600);
  };

  return (
    <div className="checkout-page">
      {/* 1. TOP NAVBAR (Logo without "AI" badge) */}
      <header className="checkout-navbar">
        <div className="checkout-navbar-container">
          {/* Logo: "TindaLink" only, no AI badge */}
          <div
            className="checkout-logo"
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
            }}
          >
            <div className="checkout-logo-icon">
              <svg viewBox="0 0 36 36" fill="none">
                <rect x="4" y="4" width="28" height="28" rx="8" fill="url(#checkoutGrad)" />
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
                  <linearGradient id="checkoutGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" />
                    <stop offset="0.55" stopColor="#8B5CF6" />
                    <stop offset="1" stopColor="#D946EF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="checkout-logo-text">
              Tinda<span className="checkout-logo-accent">Link</span>
            </span>
          </div>

          {/* Back to Cart link */}
          <div className="checkout-nav-actions">
            <button
              type="button"
              className="checkout-back-btn"
              onClick={() => {
                if (onNavigateCart) onNavigateCart();
                else if (onNavigateHome) onNavigateHome();
              }}
            >
              ← Back to Cart
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN CHECKOUT CONTENT */}
      <main className="checkout-main">
        {/* Title Area */}
        <div className="checkout-header-area">
          <h1 className="checkout-title">Checkout</h1>
          <p className="checkout-subtitle">
            Customer information, delivery address, and order summary.
          </p>
        </div>

        {/* 2-Column Content Layout (Matching CUS-05) */}
        <form onSubmit={handleSubmit} className="checkout-content-layout">
          {/* Left Column: Customer Info & Delivery Address Card */}
          <div className="checkout-forms-card">
            {/* Customer Information */}
            <section className="checkout-form-section">
              <h2 className="checkout-section-heading">Customer Information</h2>

              <div className="checkout-field-group">
                <label htmlFor="fullName" className="checkout-field-label">
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Juan Dela Cruz"
                  className="checkout-input"
                />
              </div>

              <div className="checkout-field-group">
                <label htmlFor="emailAddress" className="checkout-field-label">
                  Email address
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. you@example.com"
                  className="checkout-input"
                />
              </div>

              <div className="checkout-field-group">
                <label htmlFor="contactNumber" className="checkout-field-label">
                  Contact number
                </label>
                <input
                  id="contactNumber"
                  type="tel"
                  required
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="09xx xxx xxxx"
                  className="checkout-input"
                />
              </div>
            </section>

            {/* Delivery Address */}
            <section className="checkout-form-section" style={{ marginTop: '28px' }}>
              <h2 className="checkout-section-heading">Delivery Address</h2>

              <div className="checkout-field-group">
                <label htmlFor="addressLine" className="checkout-field-label">
                  Address line
                </label>
                <input
                  id="addressLine"
                  type="text"
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="Blk, Lot, Street, Barangay"
                  className="checkout-input"
                />
              </div>

              <div className="checkout-field-group">
                <label htmlFor="cityProvince" className="checkout-field-label">
                  City / Province
                </label>
                <input
                  id="cityProvince"
                  type="text"
                  required
                  value={cityProvince}
                  onChange={(e) => setCityProvince(e.target.value)}
                  placeholder="City, Province / Region"
                  className="checkout-input"
                />
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary Card */}
          <aside className="checkout-summary-card">
            <h2 className="checkout-summary-title">Order Summary</h2>

            {/* List of Products with individual prices */}
            <div className="checkout-items-list">
              {orderItems.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <span className="checkout-item-name">
                    {item.name} ×{item.qty}
                  </span>
                  <span className="checkout-item-price">
                    ₱ {item.totalPrice.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Row */}
            <div className="checkout-total-row">
              <span className="checkout-total-label">Total</span>
              <span className="checkout-total-amount">
                ₱ {totalAmount.toLocaleString()}
              </span>
            </div>

            {/* Prominent Continue to Payment Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="checkout-submit-btn"
            >
              {isSubmitting ? 'Processing...' : 'Continue to Payment'}
            </button>
          </aside>
        </form>
      </main>

      {/* Payment Confirmation Modal */}
      {showPaymentSuccess && (
        <div className="checkout-modal-backdrop" onClick={() => setShowPaymentSuccess(false)}>
          <div className="checkout-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="checkout-modal-badge">✓</div>
            <h3>Proceeding to Secure Payment</h3>
            <p className="checkout-modal-text">
              Order for <strong>{fullName}</strong> at <strong>{addressLine}, {cityProvince}</strong> is ready. Total payable:{' '}
              <span className="checkout-modal-total">₱ {totalAmount.toLocaleString()}</span>.
            </p>
            <div className="checkout-modal-actions">
              <button
                type="button"
                className="checkout-modal-pay-btn"
                onClick={() => {
                  alert('Payment confirmed! Your order has been placed.');
                  setShowPaymentSuccess(false);
                  if (onNavigateHome) onNavigateHome();
                }}
              >
                Pay ₱ {totalAmount.toLocaleString()} with GCash / Card
              </button>
              <button
                type="button"
                className="checkout-modal-cancel-btn"
                onClick={() => setShowPaymentSuccess(false)}
              >
                Edit Information
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}