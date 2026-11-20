import './orderconfirm.css';
import CustomerNavbar from './CustomerNavbar.jsx';

export default function OrderConfirm({
  user,
  orderNumber = 'TL-20260909-00124',
  paymentStatus = 'Pending Verification',
  itemsSummary = 'Everyday Tote Bag ×1 · Wireless Mini Speaker ×2',
  totalAmount = 2048,
  onNavigateTrackOrder,
  onNavigateShop,
  onNavigateHome,
  onNavigateCart,
  onNavigateProfile,
  onNavigateOrders,
  onLogout,
}) {
  return (
    <div className="orderconfirm-page">
      <CustomerNavbar
        user={user}
        onNavigateHome={onNavigateHome}
        onNavigateShop={onNavigateShop}
        onNavigateCart={onNavigateCart}
        onNavigateProfile={onNavigateProfile}
        onNavigateOrders={onNavigateOrders}
        onLogout={onLogout}
      />

      {/* 2. MAIN CENTERED CONFIRMATION CARD (Matching CUS-07) */}
      <main className="orderconfirm-main">
        <div className="orderconfirm-card">
          {/* Success Checkmark Icon */}
          <div className="orderconfirm-check-badge">
            <svg
              className="orderconfirm-check-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Heading & Subtitle */}
          <h1 className="orderconfirm-heading">Order Confirmed!</h1>
          <p className="orderconfirm-subtitle">
            Your order has been placed successfully and is pending verification.
          </p>

          {/* Order Details Grid */}
          <div className="orderconfirm-details-grid">
            <div className="orderconfirm-detail-col">
              <span className="orderconfirm-label">Order number</span>
              <span className="orderconfirm-value-bold">{orderNumber}</span>
            </div>
            <div className="orderconfirm-detail-col">
              <span className="orderconfirm-label">Payment status</span>
              <span className="orderconfirm-status-warning">{paymentStatus}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="orderconfirm-divider" />

          {/* Items Purchased */}
          <div className="orderconfirm-items-section">
            <span className="orderconfirm-label">Items purchased</span>
            <p className="orderconfirm-items-text">{itemsSummary}</p>
          </div>

          {/* Total Row */}
          <div className="orderconfirm-total-row">
            <span className="orderconfirm-total-label">Total</span>
            <span className="orderconfirm-total-amount">
              ₱ {totalAmount.toLocaleString()}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="orderconfirm-actions">
            <button
              type="button"
              className="orderconfirm-track-btn"
              onClick={() => {
                if (onNavigateTrackOrder) onNavigateTrackOrder();
              }}
            >
              Track Order
            </button>
            <button
              type="button"
              className="orderconfirm-continue-btn"
              onClick={() => {
                if (onNavigateShop) onNavigateShop();
                else if (onNavigateHome) onNavigateHome();
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}