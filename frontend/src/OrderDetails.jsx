import { useEffect, useState } from 'react';
import './OrderDetails.css';

const DEFAULT_ORDER = {
  id: '#TL-20260909-00124',
  shortId: '#00124',
  placedAt: 'Sep 9, 2026',
  status: 'Pending Verification',
  paymentStatus: 'Pending',
  paymentMethod: 'GCash',
  referenceNo: '123456789',
  customer: 'Peachy Mangaoang',
  contact: '09xx xxx xxxx',
  email: 'peachy@email.com',
  address: 'Makati City, Metro Manila',
  items: [
    { name: 'Everyday Tote Bag', qty: 1, price: 450 },
    { name: 'Wireless Mini Speaker', qty: 2, price: 799 },
  ],
};

const STATUS_OPTIONS = [
  'Pending Verification',
  'Paid',
  'Processing',
  'Shipped',
  'Completed',
  'Cancelled',
];

export default function OrderDetails({
  order: propOrder,
  onApprovePayment,
  onRejectPayment,
  onUpdateStatus,
  onNavigate,
  onSwitchToCustomer,
  onLogout,
}) {
  const [localOrder, setLocalOrder] = useState(DEFAULT_ORDER);
  const currentOrder = propOrder ?? localOrder;

  const [selectedStatus, setSelectedStatus] = useState(
    currentOrder.status || 'Pending Verification'
  );
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setSelectedStatus(currentOrder.status || 'Pending Verification');
  }, [currentOrder.status, currentOrder.id]);

  const navigateTo = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleApprove = () => {
    if (onApprovePayment) {
      onApprovePayment(currentOrder.id);
    } else {
      setLocalOrder((prev) => ({
        ...prev,
        paymentStatus: 'Approved',
        status: 'Paid',
      }));
    }
    setSelectedStatus('Paid');
    setFeedback(`Payment approved for ${currentOrder.id}. Order marked as Paid.`);
  };

  const handleReject = () => {
    if (onRejectPayment) {
      onRejectPayment(currentOrder.id);
    } else {
      setLocalOrder((prev) => ({
        ...prev,
        paymentStatus: 'Rejected',
        status: 'Cancelled',
      }));
    }
    setSelectedStatus('Cancelled');
    setFeedback(`Payment rejected for ${currentOrder.id}. Order status updated to Cancelled.`);
  };

  const handleApplyStatus = () => {
    if (onUpdateStatus) {
      onUpdateStatus(currentOrder.id, selectedStatus);
    } else {
      setLocalOrder((prev) => ({
        ...prev,
        status: selectedStatus,
        paymentStatus:
          selectedStatus === 'Cancelled'
            ? 'Rejected'
            : selectedStatus === 'Pending Verification'
            ? 'Pending'
            : 'Approved',
      }));
    }
    setFeedback(`Order ${currentOrder.id} status updated to "${selectedStatus}".`);
  };

  const getBadgeClass = (status) => {
    const val = String(status || '').toLowerCase();
    if (val.includes('pending')) return 'od-badge-pending';
    if (val.includes('cancelled')) return 'od-badge-cancelled';
    if (val.includes('paid') || val.includes('completed')) return 'od-badge-completed';
    return 'od-badge-processing';
  };

  const displayOrderNumber = currentOrder.id?.startsWith('#TL-')
    ? currentOrder.id
    : `#TL-20260909-${String(currentOrder.id || '00124').replace('#', '')}`;

  return (
    <div className="od-layout">
      {/* Dark Navy/Purple Sidebar */}
      <aside className="od-sidebar" aria-label="Merchant Navigation">
        <div>
          <div className="od-brand">
            <span className="od-brand-name">TindaLink</span>
            <span className="od-brand-role">MERCHANT</span>
          </div>

          <nav className="od-nav">
            <button
              type="button"
              className="od-nav-item"
              onClick={() => navigateTo('dashboard')}
            >
              Dashboard
            </button>
            <button
              type="button"
              className="od-nav-item"
              onClick={() => navigateTo('products')}
            >
              Products
            </button>
            <button
              type="button"
              className="od-nav-item"
              onClick={() => navigateTo('inventory')}
            >
              Inventory
            </button>
            <button
              type="button"
              className="od-nav-item active"
              onClick={() => navigateTo('orders')}
            >
              Orders
            </button>
            <button
              type="button"
              className="od-nav-item"
              onClick={() => navigateTo('payments')}
            >
              Payments
            </button>
            <button
              type="button"
              className="od-nav-item"
              onClick={() => navigateTo('store')}
            >
              Store
            </button>
            <button
              type="button"
              className="od-nav-item"
              onClick={() => navigateTo('social')}
            >
              Social Media
            </button>
            <button
              type="button"
              className="od-nav-item"
              onClick={() => navigateTo('settings')}
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="od-sidebar-footer">TindaLink</div>
      </aside>

      {/* Main Content Shell */}
      <div className="od-content-shell">
        <header className="od-topbar">
          <span className="od-topbar-title">Merchant Portal</span>
          {(onSwitchToCustomer || onLogout) && (
            <div className="od-topbar-actions">
              {onSwitchToCustomer && (
                <button
                  type="button"
                  className="od-topbar-btn"
                  onClick={onSwitchToCustomer}
                >
                  Customer View
                </button>
              )}
              {onLogout && (
                <button
                  type="button"
                  className="od-topbar-btn od-topbar-btn-outline"
                  onClick={onLogout}
                >
                  Log Out
                </button>
              )}
            </div>
          )}
        </header>

        <main className="od-main">
          <div className="od-page-header">
            <div>
              <h1 className="od-page-title">Order Details</h1>
              <p className="od-page-subtitle">
                Review customer information, products, payment proof, and update status.
              </p>
            </div>
            {onNavigate && (
              <button
                type="button"
                className="od-back-link"
                onClick={() => navigateTo('orders')}
              >
                ← Back to Orders
              </button>
            )}
          </div>

          {feedback && (
            <div className="od-feedback-banner" role="status">
              <span>{feedback}</span>
              <button
                type="button"
                className="od-feedback-close"
                onClick={() => setFeedback('')}
                aria-label="Dismiss message"
              >
                ×
              </button>
            </div>
          )}

          {/* Top Order Summary Header Card */}
          <section className="od-order-banner">
            <div>
              <div className="od-order-number">Order {displayOrderNumber}</div>
              <div className="od-order-date">
                Placed {currentOrder.placedAt || 'Sep 9, 2026'}
              </div>
            </div>
            <span className={`od-status-pill ${getBadgeClass(currentOrder.status)}`}>
              {currentOrder.status}
            </span>
          </section>

          {/* Middle Grid: Customer Information + Products */}
          <section className="od-two-col">
            <div className="od-card">
              <h2 className="od-card-title">Customer Information</h2>
              <div className="od-info-list">
                <div className="od-info-row">
                  <span className="od-info-label">Name</span>
                  <span className="od-info-value">{currentOrder.customer}</span>
                </div>
                <div className="od-info-row">
                  <span className="od-info-label">Contact</span>
                  <span className="od-info-value">
                    {currentOrder.contact || '09xx xxx xxxx'}
                  </span>
                </div>
                <div className="od-info-row">
                  <span className="od-info-label">Email</span>
                  <span className="od-info-value">
                    {currentOrder.email || 'peachy@email.com'}
                  </span>
                </div>
                <div className="od-info-row">
                  <span className="od-info-label">Address</span>
                  <span className="od-info-value">
                    {currentOrder.address || 'Makati City, Metro Manila'}
                  </span>
                </div>
              </div>
            </div>

            <div className="od-card">
              <h2 className="od-card-title">Products</h2>
              <div className="od-products-list">
                {(currentOrder.items || []).map((item, idx) => (
                  <div key={`${item.name}-${idx}`} className="od-product-row">
                    <span className="od-product-name">
                      {item.name} ×{item.qty}
                    </span>
                    <span className="od-product-price">
                      ₱{(Number(item.price) * Number(item.qty)).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom Grid: Payment Proof + Update Order Status */}
          <section className="od-two-col">
            <div className="od-card">
              <h2 className="od-card-title">Payment Proof</h2>
              <div className="od-receipt-preview">
                <span className="od-receipt-label">
                  {currentOrder.paymentMethod || 'GCash'} receipt preview
                </span>
                {currentOrder.referenceNo && (
                  <span className="od-receipt-ref">
                    Ref: {currentOrder.referenceNo} · {currentOrder.paymentStatus || 'Pending'}
                  </span>
                )}
              </div>
              <div className="od-proof-actions">
                <button
                  type="button"
                  className="od-btn-primary"
                  onClick={handleApprove}
                >
                  Approve Payment
                </button>
                <button
                  type="button"
                  className="od-btn-secondary"
                  onClick={handleReject}
                >
                  Reject
                </button>
              </div>
            </div>

            <div className="od-card">
              <h2 className="od-card-title">Update Order Status</h2>
              <div className="od-status-grid" role="radiogroup" aria-label="Order Status">
                {STATUS_OPTIONS.map((statusOption) => (
                  <button
                    key={statusOption}
                    type="button"
                    role="radio"
                    aria-checked={selectedStatus === statusOption}
                    className={`od-status-option ${
                      selectedStatus === statusOption ? 'selected' : ''
                    }`}
                    onClick={() => setSelectedStatus(statusOption)}
                  >
                    {statusOption}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="od-btn-primary od-update-btn"
                onClick={handleApplyStatus}
              >
                Update Status
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}