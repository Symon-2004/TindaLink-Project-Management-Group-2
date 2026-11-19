import { useState } from 'react';
import './PaymentManagement.css';

const DEFAULT_PAYMENTS = [
  { id: 'pay-1', orderId: '#00124', customer: 'Peachy Mangaoang', method: 'GCash', reference: '123456789', amount: 2048, status: 'Pending' },
  { id: 'pay-2', orderId: '#00118', customer: 'A. Santos', method: 'GCash', reference: 'GC77124', amount: 899, status: 'Pending' },
  { id: 'pay-3', orderId: '#00115', customer: 'M. Cruz', method: 'GCash', reference: 'GC77124', amount: 450, status: 'Approved' },
  { id: 'pay-4', orderId: '#00109', customer: 'J. Reyes', method: 'GCash', reference: 'GC77124', amount: 650, status: 'Approved' },
  { id: 'pay-5', orderId: '#00103', customer: 'L. Garcia', method: 'GCash', reference: 'GC1123', amount: 299, status: 'Rejected' },
];

export default function PaymentManagement({
  payments: propPayments,
  onUpdatePaymentStatus,
  onViewOrder,
  onNavigate,
  onSwitchToCustomer,
  onLogout,
}) {
  const [localPayments, setLocalPayments] = useState(DEFAULT_PAYMENTS);
  const [reviewingPaymentId, setReviewingPaymentId] = useState('');
  const [feedback, setFeedback] = useState('');

  const payments = propPayments ?? localPayments;

  const pendingReviews = 10 + payments.filter((p) => p.status === 'Pending').length;
  const approvedCount = 92 + payments.filter((p) => p.status === 'Approved').length;
  const rejectedCount = 4 + payments.filter((p) => p.status === 'Rejected').length;

  const reviewingPayment = payments.find((p) => p.id === reviewingPaymentId) || null;

  const navigateTo = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleDecision = (payment, nextStatus) => {
    if (onUpdatePaymentStatus) {
      onUpdatePaymentStatus(payment.orderId, nextStatus);
    } else {
      setLocalPayments((prev) =>
        prev.map((item) =>
          item.id === payment.id ? { ...item, status: nextStatus } : item
        )
      );
    }
    setReviewingPaymentId('');
    setFeedback(`Payment for ${payment.orderId} marked as ${nextStatus}.`);
  };

  const getStatusClass = (status) => {
    const val = String(status || '').toLowerCase();
    if (val === 'approved') return 'pmt-status-approved';
    if (val === 'rejected') return 'pmt-status-rejected';
    return 'pmt-status-pending';
  };

  return (
    <div className="pmt-layout">
      {/* Dark Navy/Purple Sidebar */}
      <aside className="pmt-sidebar" aria-label="Merchant Navigation">
        <div>
          <div className="pmt-brand">
            <span className="pmt-brand-name">TindaLink</span>
            <span className="pmt-brand-role">MERCHANT</span>
          </div>

          <nav className="pmt-nav">
            <button
              type="button"
              className="pmt-nav-item"
              onClick={() => navigateTo('dashboard')}
            >
              Dashboard
            </button>
            <button
              type="button"
              className="pmt-nav-item"
              onClick={() => navigateTo('products')}
            >
              Products
            </button>
            <button
              type="button"
              className="pmt-nav-item"
              onClick={() => navigateTo('inventory')}
            >
              Inventory
            </button>
            <button
              type="button"
              className="pmt-nav-item"
              onClick={() => navigateTo('orders')}
            >
              Orders
            </button>
            <button
              type="button"
              className="pmt-nav-item active"
              onClick={() => navigateTo('payments')}
            >
              Payments
            </button>
            <button
              type="button"
              className="pmt-nav-item"
              onClick={() => navigateTo('store')}
            >
              Store
            </button>
            <button
              type="button"
              className="pmt-nav-item"
              onClick={() => navigateTo('social')}
            >
              Social Media
            </button>
            <button
              type="button"
              className="pmt-nav-item"
              onClick={() => navigateTo('settings')}
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="pmt-sidebar-footer">TindaLink</div>
      </aside>

      {/* Main Content Shell */}
      <div className="pmt-content-shell">
        <header className="pmt-topbar">
          <span className="pmt-topbar-title">Merchant Portal</span>
          {(onSwitchToCustomer || onLogout) && (
            <div className="pmt-topbar-actions">
              {onSwitchToCustomer && (
                <button
                  type="button"
                  className="pmt-topbar-btn"
                  onClick={onSwitchToCustomer}
                >
                  Customer View
                </button>
              )}
              {onLogout && (
                <button
                  type="button"
                  className="pmt-topbar-btn pmt-topbar-btn-outline"
                  onClick={onLogout}
                >
                  Log Out
                </button>
              )}
            </div>
          )}
        </header>

        <main className="pmt-main">
          <div className="pmt-page-header">
            <h1 className="pmt-page-title">Payment Management</h1>
            <p className="pmt-page-subtitle">
              Review submitted payment proofs and manually approve or reject payments.
            </p>
          </div>

          {feedback && (
            <div className="pmt-feedback-banner" role="status">
              <span>{feedback}</span>
              <button
                type="button"
                className="pmt-feedback-close"
                onClick={() => setFeedback('')}
                aria-label="Dismiss message"
              >
                ×
              </button>
            </div>
          )}

          {/* 3 Summary Stat Cards */}
          <section className="pmt-kpi-row" aria-label="Payment Statistics">
            <div className="pmt-kpi-card">
              <div className="pmt-kpi-value pmt-val-amber">{pendingReviews}</div>
              <div className="pmt-kpi-label">Pending Reviews</div>
            </div>

            <div className="pmt-kpi-card">
              <div className="pmt-kpi-value pmt-val-green">{approvedCount}</div>
              <div className="pmt-kpi-label">Approved</div>
            </div>

            <div className="pmt-kpi-card">
              <div className="pmt-kpi-value pmt-val-red">{rejectedCount}</div>
              <div className="pmt-kpi-label">Rejected</div>
            </div>
          </section>

          {/* Submitted Payments Table Card */}
          <section className="pmt-table-card">
            <div className="pmt-table-wrap">
              <table className="pmt-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Method</th>
                    <th>Reference</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="pmt-col-order">{payment.orderId}</td>
                      <td className="pmt-col-customer">{payment.customer}</td>
                      <td className="pmt-col-method">{payment.method}</td>
                      <td className="pmt-col-ref">{payment.reference}</td>
                      <td>
                        <span className={`pmt-status-text ${getStatusClass(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="pmt-review-btn"
                          onClick={() => setReviewingPaymentId(payment.id)}
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* Review Payment Modal */}
      {reviewingPayment && (
        <div
          className="pmt-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Review Payment for ${reviewingPayment.orderId}`}
        >
          <div className="pmt-modal">
            <div className="pmt-modal-header">
              <h2>Review Payment {reviewingPayment.orderId}</h2>
              <button
                type="button"
                className="pmt-modal-close"
                onClick={() => setReviewingPaymentId('')}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="pmt-modal-meta">
              <div className="pmt-meta-row">
                <span>Customer</span>
                <strong>{reviewingPayment.customer}</strong>
              </div>
              <div className="pmt-meta-row">
                <span>Method</span>
                <strong>{reviewingPayment.method}</strong>
              </div>
              <div className="pmt-meta-row">
                <span>Reference No.</span>
                <strong>{reviewingPayment.reference}</strong>
              </div>
              <div className="pmt-meta-row">
                <span>Amount</span>
                <strong className="pmt-meta-amount">
                  ₱{Number(reviewingPayment.amount || 0).toLocaleString()}
                </strong>
              </div>
            </div>

            <div className="pmt-modal-receipt">
              <span>{reviewingPayment.method} receipt preview</span>
              <small>Ref #{reviewingPayment.reference}</small>
            </div>

            <div className="pmt-modal-actions">
              {onViewOrder && (
                <button
                  type="button"
                  className="pmt-btn-link"
                  onClick={() => {
                    setReviewingPaymentId('');
                    onViewOrder(reviewingPayment.orderId);
                  }}
                >
                  View Order Details
                </button>
              )}
              <div className="pmt-modal-btns">
                <button
                  type="button"
                  className="pmt-btn-secondary"
                  onClick={() => handleDecision(reviewingPayment, 'Rejected')}
                >
                  Reject
                </button>
                <button
                  type="button"
                  className="pmt-btn-primary"
                  onClick={() => handleDecision(reviewingPayment, 'Approved')}
                >
                  Approve Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}