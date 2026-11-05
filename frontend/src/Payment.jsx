import { useState, useRef } from 'react';
import './Payment.css';

export default function Payment({
  totalAmount = 2048,
  onNavigateHome,
  onNavigateCheckout,
}) {
  // Payment method selection ('gcash' | 'cod')
  const [selectedMethod, setSelectedMethod] = useState('gcash');

  // Payment proof & reference
  const [referenceNumber, setReferenceNumber] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Pending verification');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      if (!referenceNumber) {
        setReferenceNumber(`RECEIPT_${file.name.slice(0, 10).toUpperCase()}`);
      }
    }
  };

  const handleTriggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    if (selectedMethod === 'gcash' && !referenceNumber && !uploadedFileName) {
      alert('Please enter a reference number or upload proof of payment for GCash.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPaymentStatus(
        selectedMethod === 'cod' ? 'Cash on Delivery confirmed' : 'Proof submitted • Verification in progress'
      );
      setShowSuccessModal(true);
    }, 600);
  };

  return (
    <div className="payment-page">
      {/* 1. TOP NAVBAR (Logo: TindaLink only, without "AI" badge) */}
      <header className="payment-navbar">
        <div className="payment-navbar-container">
          {/* Logo: "TindaLink" only */}
          <div
            className="payment-logo"
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
            }}
          >
            <div className="payment-logo-icon">
              <svg viewBox="0 0 36 36" fill="none">
                <rect x="4" y="4" width="28" height="28" rx="8" fill="url(#paymentGrad)" />
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
                  <linearGradient id="paymentGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" />
                    <stop offset="0.55" stopColor="#8B5CF6" />
                    <stop offset="1" stopColor="#D946EF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="payment-logo-text">
              Tinda<span className="payment-logo-accent">Link</span>
            </span>
          </div>

          {/* Navigation Action */}
          <div className="payment-nav-actions">
            <button
              type="button"
              className="payment-back-btn"
              onClick={() => {
                if (onNavigateCheckout) onNavigateCheckout();
                else if (onNavigateHome) onNavigateHome();
              }}
            >
              ← Back to Checkout
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN PAYMENT CONTENT */}
      <main className="payment-main">
        {/* Title Area */}
        <div className="payment-header-area">
          <h1 className="payment-title">Payment</h1>
          <p className="payment-subtitle">
            Choose a supported payment method and submit proof when required.
          </p>
        </div>

        {/* 2-Column Content Layout (Matching CUS-06) */}
        <div className="payment-content-layout">
          {/* Left Column: Payment Method & Proof / Reference */}
          <div className="payment-forms-card">
            {/* Section 1: Payment Method */}
            <section className="payment-form-section">
              <h2 className="payment-section-heading">Payment Method</h2>

              <div className="payment-methods-list">
                {/* GCash Option */}
                <div
                  className={`payment-method-card ${selectedMethod === 'gcash' ? 'active' : ''}`}
                  onClick={() => setSelectedMethod('gcash')}
                  role="button"
                  tabIndex={0}
                >
                  <div className="payment-method-header">
                    <div className="payment-method-info">
                      <span className="payment-method-name">GCash</span>
                      <p className="payment-method-desc">
                        Pay using your seller's GCash account.
                      </p>
                    </div>
                    <div className={`payment-radio-indicator ${selectedMethod === 'gcash' ? 'selected' : ''}`}>
                      {selectedMethod === 'gcash' && <div className="payment-radio-dot" />}
                    </div>
                  </div>

                  {selectedMethod === 'gcash' && (
                    <div className="payment-gcash-seller-box">
                      <div className="payment-gcash-badge">Seller GCash Account</div>
                      <div className="payment-gcash-details">
                        <p><strong>Mobile No:</strong> 0917 892 4567</p>
                        <p><strong>Account Name:</strong> Peachy Finds Store</p>
                        <p className="payment-gcash-hint">Please copy the reference number or save your transfer receipt to attach below.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cash on Delivery Option */}
                <div
                  className={`payment-method-card ${selectedMethod === 'cod' ? 'active' : ''}`}
                  onClick={() => setSelectedMethod('cod')}
                  role="button"
                  tabIndex={0}
                >
                  <div className="payment-method-header">
                    <div className="payment-method-info">
                      <span className="payment-method-name">Cash on Delivery</span>
                      <p className="payment-method-desc">
                        Pay when your order is delivered.
                      </p>
                    </div>
                    <div className={`payment-radio-indicator ${selectedMethod === 'cod' ? 'selected' : ''}`}>
                      {selectedMethod === 'cod' && <div className="payment-radio-dot" />}
                    </div>
                  </div>

                  {selectedMethod === 'cod' && (
                    <div className="payment-cod-notice">
                      <p>✓ Please prepare exact amount of <strong>₱ {totalAmount.toLocaleString()}</strong> upon delivery to your provided address.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Section 2: Payment Proof / Reference */}
            <section className="payment-form-section payment-proof-section">
              <h2 className="payment-section-heading">Payment Proof / Reference</h2>

              {/* Text input / Box for receipt or reference number */}
              <div className="payment-reference-input-wrapper">
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="Upload your receipt or enter a reference number."
                  className="payment-reference-input"
                />
                {uploadedFileName && (
                  <div className="payment-uploaded-tag">
                    <span>📎 {uploadedFileName}</span>
                    <button
                      type="button"
                      className="payment-remove-file"
                      onClick={() => {
                        setUploadedFileName('');
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              {/* Hidden file input for actual receipt uploads */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                className="payment-hidden-file-input"
                onChange={handleFileUpload}
              />

              {/* Buttons: Upload Proof & Submit Payment */}
              <div className="payment-actions-row">
                <button
                  type="button"
                  className="payment-upload-btn"
                  onClick={handleTriggerUpload}
                >
                  Upload Proof
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  className="payment-submit-btn"
                  onClick={handleSubmitPayment}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Payment'}
                </button>
              </div>
            </section>
          </div>

          {/* Right Column: Order Total Card */}
          <aside className="payment-summary-card">
            <h2 className="payment-summary-title">Order Total</h2>

            {/* Items row */}
            <div className="payment-summary-row">
              <span className="payment-summary-label">Items</span>
              <span className="payment-summary-value">
                ₱ {totalAmount.toLocaleString()}
              </span>
            </div>

            {/* Divider line */}
            <div className="payment-summary-divider" />

            {/* Total row */}
            <div className="payment-total-row">
              <span className="payment-total-label">Total</span>
              <span className="payment-total-amount">
                ₱ {totalAmount.toLocaleString()}
              </span>
            </div>

            {/* Payment status badge / pill container */}
            <div className="payment-status-badge">
              <span>Payment status: {paymentStatus}</span>
            </div>
          </aside>
        </div>
      </main>

      {/* Confirmation / Success Modal */}
      {showSuccessModal && (
        <div className="payment-modal-backdrop" onClick={() => setShowSuccessModal(false)}>
          <div className="payment-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="payment-modal-badge">✓</div>
            <h3>Payment Received</h3>
            <p className="payment-modal-text">
              {selectedMethod === 'gcash' ? (
                <>
                  Thank you! Your GCash payment proof for <strong>₱ {totalAmount.toLocaleString()}</strong> has been submitted.
                  {referenceNumber && (
                    <span className="payment-ref-badge">
                      Reference No: <strong>{referenceNumber}</strong>
                    </span>
                  )}
                  Our merchant team is verifying your payment.
                </>
              ) : (
                <>
                  Your Cash on Delivery order for <strong>₱ {totalAmount.toLocaleString()}</strong> is confirmed and scheduled for dispatch. Please keep cash ready.
                </>
              )}
            </p>
            <div className="payment-modal-actions">
              <button
                type="button"
                className="payment-modal-btn"
                onClick={() => {
                  setShowSuccessModal(false);
                  if (onNavigateHome) onNavigateHome();
                }}
              >
                Back to Dashboard
              </button>
              <button
                type="button"
                className="payment-modal-secondary-btn"
                onClick={() => setShowSuccessModal(false)}
              >
                View Order Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}