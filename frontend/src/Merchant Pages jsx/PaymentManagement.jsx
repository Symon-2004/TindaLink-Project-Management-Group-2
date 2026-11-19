import React, { useState } from 'react';
import '../Merchant Pages Styling/PaymentManagement.css';

const initialPayments = [
  {
    id: '#00124',
    customer: 'Peachy Mangaoang',
    method: 'GCash',
    reference: '123456789',
    status: 'Pending',
    amount: '₱1,250.00',
    date: 'Nov 19, 2026 • 08:15 AM',
    proofUrl: 'https://placehold.co/320x500/f3f4f6/1f1b38?text=GCash+Receipt+%23123456789',
  },
  {
    id: '#00118',
    customer: 'A. Santos',
    method: 'GCash',
    reference: 'GC77124',
    status: 'Pending',
    amount: '₱890.00',
    date: 'Nov 18, 2026 • 04:42 PM',
    proofUrl: 'https://placehold.co/320x500/f3f4f6/1f1b38?text=GCash+Receipt+GC77124',
  },
  {
    id: '#00115',
    customer: 'M. Cruz',
    method: 'GCash',
    reference: 'GC77124',
    status: 'Approved',
    amount: '₱2,400.00',
    date: 'Nov 18, 2026 • 01:10 PM',
    proofUrl: 'https://placehold.co/320x500/f3f4f6/1f1b38?text=GCash+Receipt+GC77124',
  },
  {
    id: '#00109',
    customer: 'J. Reyes',
    method: 'GCash',
    reference: 'GC77124',
    status: 'Approved',
    amount: '₱540.00',
    date: 'Nov 17, 2026 • 11:20 AM',
    proofUrl: 'https://placehold.co/320x500/f3f4f6/1f1b38?text=GCash+Receipt+GC77124',
  },
  {
    id: '#00103',
    customer: 'L. Garcia',
    method: 'GCash',
    reference: 'GC1123',
    status: 'Rejected',
    amount: '₱1,750.00',
    date: 'Nov 16, 2026 • 06:05 PM',
    proofUrl: 'https://placehold.co/320x500/f3f4f6/1f1b38?text=GCash+Receipt+GC1123',
  },
];

const PaymentManagement = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Base counts from your mockup adjusted dynamically when rows change status
  const baseCounts = { Pending: 10, Approved: 92, Rejected: 4 };
  const pendingCount =
    baseCounts.Pending + payments.filter((p) => p.status === 'Pending').length;
  const approvedCount =
    baseCounts.Approved + payments.filter((p) => p.status === 'Approved').length;
  const rejectedCount =
    baseCounts.Rejected + payments.filter((p) => p.status === 'Rejected').length;

  const handleStatusUpdate = (orderId, newStatus) => {
    setPayments((prev) =>
      prev.map((item) =>
        item.id === orderId ? { ...item, status: newStatus } : item
      )
    );
    setSelectedPayment(null);
  };

  return (
    <div className="pm-page">
      {/* Header */}
      <header className="pm-header">
        <h1 className="pm-title">Payment Management</h1>
        <p className="pm-subtitle">
          Review submitted payment proofs and manually approve or reject payments.
        </p>
      </header>

      {/* Summary Cards */}
      <section className="pm-stats-grid">
        <div className="pm-stat-card">
          <span className="pm-stat-value pm-stat-pending">{pendingCount}</span>
          <span className="pm-stat-label">Pending Reviews</span>
        </div>
        <div className="pm-stat-card">
          <span className="pm-stat-value pm-stat-approved">{approvedCount}</span>
          <span className="pm-stat-label">Approved</span>
        </div>
        <div className="pm-stat-card">
          <span className="pm-stat-value pm-stat-rejected">{rejectedCount}</span>
          <span className="pm-stat-label">Rejected</span>
        </div>
      </section>

      {/* Payments Table Card */}
      <section className="pm-table-card">
        <div className="pm-table-wrapper">
          <table className="pm-table">
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
                  <td className="pm-order-id">{payment.id}</td>
                  <td className="pm-customer">{payment.customer}</td>
                  <td className="pm-method">{payment.method}</td>
                  <td className="pm-reference">{payment.reference}</td>
                  <td>
                    <span
                      className={`pm-status pm-status-${payment.status.toLowerCase()}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="pm-action-btn"
                      onClick={() => setSelectedPayment(payment)}
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

      {/* Proof Review Modal */}
      {selectedPayment && (
        <div
          className="pm-modal-backdrop"
          onClick={() => setSelectedPayment(null)}
        >
          <div className="pm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pm-modal-header">
              <div>
                <h2 className="pm-modal-title">
                  Review Payment {selectedPayment.id}
                </h2>
                <p className="pm-modal-meta">{selectedPayment.date}</p>
              </div>
              <button
                type="button"
                className="pm-modal-close"
                onClick={() => setSelectedPayment(null)}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div className="pm-modal-body">
              <div className="pm-proof-preview">
                <img
                  src={selectedPayment.proofUrl}
                  alt={`Payment proof for ${selectedPayment.id}`}
                />
              </div>

              <div className="pm-proof-details">
                <div className="pm-detail-row">
                  <span>Customer</span>
                  <strong>{selectedPayment.customer}</strong>
                </div>
                <div className="pm-detail-row">
                  <span>Payment Method</span>
                  <strong>{selectedPayment.method}</strong>
                </div>
                <div className="pm-detail-row">
                  <span>Reference No.</span>
                  <strong>{selectedPayment.reference}</strong>
                </div>
                <div className="pm-detail-row">
                  <span>Amount</span>
                  <strong>{selectedPayment.amount}</strong>
                </div>
                <div className="pm-detail-row">
                  <span>Current Status</span>
                  <span
                    className={`pm-status pm-status-${selectedPayment.status.toLowerCase()}`}
                  >
                    {selectedPayment.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="pm-modal-footer">
              <button
                type="button"
                className="pm-btn pm-btn-reject"
                onClick={() =>
                  handleStatusUpdate(selectedPayment.id, 'Rejected')
                }
              >
                Reject Payment
              </button>
              <button
                type="button"
                className="pm-btn pm-btn-approve"
                onClick={() =>
                  handleStatusUpdate(selectedPayment.id, 'Approved')
                }
              >
                Approve Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;