import React, { useState } from 'react';
import '../Merchant Pages Styling/OrderDetails.css';

const OrderDetails = () => {
  const [selectedStatus, setSelectedStatus] = useState('Pending Verification');
  const [currentOrderStatus, setCurrentOrderStatus] = useState('Pending Verification');

  const statusOptions = [
    'Pending Verification',
    'Paid',
    'Processing',
    'Shipped',
    'Completed',
    'Cancelled'
  ];

  const handleUpdateStatus = () => {
    setCurrentOrderStatus(selectedStatus);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>TindaLink AI</h2>
          <span className="subtitle">MERCHANT</span>
        </div>
        
        <nav className="sidebar-nav">
          <a href="#" className="nav-item">Dashboard</a>
          <a href="#" className="nav-item">Products</a>
          <a href="#" className="nav-item">Inventory</a>
          <a href="#" className="nav-item active">Orders</a>
          <a href="#" className="nav-item">Payments</a>
          <a href="#" className="nav-item">Store</a>
          <div className="nav-spacer"></div>
          <a href="#" className="nav-item">Social Media</a>
          <a href="#" className="nav-item">Settings</a>
        </nav>

        <div className="sidebar-footer">
          <p>TindaLink AI</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <h1>Merchant Portal</h1>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <div className="page-title-area">
            <h2>Order Details</h2>
            <p>Review customer information, products, payment proof, and update status.</p>
          </div>

          {/* Order Header Banner */}
          <div className="card order-banner-card">
            <div className="order-banner-info">
              <h3>Order #TL-20260909-00124</h3>
              <p>Placed Sep 9, 2026</p>
            </div>
            <span className="status-badge-warning">{currentOrderStatus}</span>
          </div>

          {/* 2x2 Details Grid */}
          <div className="details-grid">
            {/* Customer Information */}
            <div className="card">
              <h3 className="card-title">Customer Information</h3>
              <div className="info-list">
                <div className="info-row">
                  <span className="info-label">Name</span>
                  <span className="info-value">Peachy Mangaoang</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Contact</span>
                  <span className="info-value">09xx xxx xxxx</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email</span>
                  <span className="info-value">peachy@email.com</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Address</span>
                  <span className="info-value">Makati City, Metro Manila</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="card">
              <h3 className="card-title">Products</h3>
              <div className="product-items-list">
                <div className="product-item-row">
                  <span className="product-item-name">Everyday Tote Bag ×1</span>
                  <span className="product-item-price">₱450</span>
                </div>
                <div className="product-item-row">
                  <span className="product-item-name">Wireless Mini Speaker ×2</span>
                  <span className="product-item-price">₱1,598</span>
                </div>
              </div>
            </div>

            {/* Payment Proof */}
            <div className="card">
              <h3 className="card-title">Payment Proof</h3>
              <div className="receipt-preview-box">
                <span>GCash receipt preview</span>
              </div>
              <div className="payment-actions-row">
                <button className="btn btn-primary">Approve Payment</button>
                <button className="btn btn-secondary">Reject</button>
              </div>
            </div>

            {/* Update Order Status */}
            <div className="card">
              <h3 className="card-title">Update Order Status</h3>
              <div className="status-options-grid">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`status-option-btn ${selectedStatus === status ? 'selected' : ''}`}
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <div className="update-status-footer">
                <button className="btn btn-primary btn-update-status" onClick={handleUpdateStatus}>
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetails;