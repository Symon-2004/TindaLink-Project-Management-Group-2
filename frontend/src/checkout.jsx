import { useState } from 'react';
import './checkout.css';
import CustomerNavbar from './CustomerNavbar.jsx';

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

export default function Checkout({
  user,
  onNavigateCart,
  onNavigateHome,
  onNavigateShop,
  onNavigateProfile,
  onNavigateOrders,
  onNavigatePayment,
  onLogout,
}) {
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
      <CustomerNavbar
        user={user}
        backAction={{
          label: '← Back to Cart',
          onClick: () => {
            if (onNavigateCart) onNavigateCart();
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
                  setShowPaymentSuccess(false);
                  if (onNavigatePayment) onNavigatePayment();
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