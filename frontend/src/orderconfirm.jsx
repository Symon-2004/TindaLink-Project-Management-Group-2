import React from 'react';
import './orderconfirm.css';

export default function OrderConfirm({
  orderNumber = 'TL-20260909-00124',
  paymentStatus = 'Pending Verification',
  itemsSummary = 'Everyday Tote Bag ×1 · Wireless Mini Speaker ×2',
  totalAmount = 2048,
  onNavigateTrackOrder,
  onNavigateShop,
  onNavigateHome,
}) {
  return (
    <div className="orderconfirm-page">
      {/* 1. TOP NAVBAR (TindaLink logo without AI badge) */}
      <header className="orderconfirm-navbar">
        <div className="orderconfirm-navbar-container">
          <div
            className="orderconfirm-logo"
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
            }}
          >
            <div className="orderconfirm-logo-icon">
              <svg viewBox="0 0 36 36" fill="none">
                <rect x="4" y="4" width="28" height="28" rx="8" fill="url(#orderConfirmGrad)" />
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
                  <linearGradient id="orderConfirmGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" />
                    <stop offset="0.55" stopColor="#8B5CF6" />
                    <stop offset="1" stopColor="#D946EF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="orderconfirm-logo-text">
              Tinda<span className="orderconfirm-logo-accent">Link</span>
            </span>
          </div>

          <div className="orderconfirm-nav-actions">
            <button
              type="button"
              className="orderconfirm-home-btn"
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
              }}
            >
              Home
            </button>
          </div>
        </div>
      </header>

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