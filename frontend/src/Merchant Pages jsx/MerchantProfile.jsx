import React, { useState } from 'react';
import '../Merchant Pages Styling/MerchantProfile.css';

const MerchantProfile = () => {
  const [activeTab, setActiveTab] = useState('Account Information');
  const [formData, setFormData] = useState({
    fullName: 'Peachy Mangaoang',
    email: 'peachy@email.com',
    contactNumber: '09xx xxx xxxx',
    username: '@Tindalink_AI',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Handle save logic here
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
          <a href="#" className="nav-item">Orders</a>
          <a href="#" className="nav-item">Payments</a>
          <a href="#" className="nav-item">Store</a>
          <a href="#" className="nav-item">Social Media</a>
          <a href="#" className="nav-item active">Settings</a>
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
            <h2>Merchant Profile &amp; Settings</h2>
            <p>Manage account information, store settings, payment methods, and security.</p>
          </div>

          <div className="profile-layout">
            {/* Left Profile Navigation Card */}
            <div className="card profile-sidebar-card">
              <div className="profile-avatar-section">
                <div className="profile-avatar">TL</div>
                <h3>TindaLink AI</h3>
                <p>Business Owner</p>
              </div>

              <div className="profile-subnav">
                <button
                  type="button"
                  className={`subnav-btn ${activeTab === 'Account Information' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Account Information')}
                >
                  Account Information
                </button>
                <button
                  type="button"
                  className={`subnav-btn ${activeTab === 'Store Settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Store Settings')}
                >
                  Store Settings
                </button>
                <button
                  type="button"
                  className={`subnav-btn ${activeTab === 'Payment Settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Payment Settings')}
                >
                  Payment Settings
                </button>
                <button
                  type="button"
                  className={`subnav-btn ${activeTab === 'Security' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Security')}
                >
                  Security
                </button>
                <button type="button" className="subnav-btn logout-btn">
                  Log Out
                </button>
              </div>
            </div>

            {/* Right Account Information Form Card */}
            <div className="card profile-details-card">
              <form className="profile-form" onSubmit={handleSave}>
                <h3 className="section-heading">Account Information</h3>

                <div className="form-group">
                  <label>Full name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Contact number</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="payment-settings-section">
                  <h3 className="section-heading">Payment Settings</h3>
                  <div className="payment-row">
                    <span className="payment-label">GCash</span>
                    <span className="payment-value">09xx xxx xxxx</span>
                  </div>
                  <div className="payment-row">
                    <span className="payment-label">Cash on Delivery</span>
                    <span className="payment-value">Enabled</span>
                  </div>
                </div>

                <div className="save-btn-wrapper">
                  <button type="submit" className="btn-save-changes">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MerchantProfile;