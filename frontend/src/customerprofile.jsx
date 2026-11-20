import { useState } from 'react';
import './customerprofile.css';
import CustomerNavbar from './CustomerNavbar.jsx';

export default function CustomerProfile({
  user,
  onNavigateOrders,
  onNavigateHome,
  onNavigateShop,
  onNavigateCart,
  onNavigateProfile,
  onLogout,
}) {
  const [activeSection, setActiveSection] = useState('personal');

  // Customer profile display values
  const fullName = user?.name || 'Peachy Mahaleel M. Mangaoang';
  const displayName = user?.name ? user.name.split(' ')[0] : 'Peachy Mangaoang';
  const email = user?.email || 'peachy@email.com';
  const contactNumber = user?.phone || '09xx xxx xxxx';
  const memberSince = user?.joined || '2026';

  // Addresses state
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      isPrimary: true,
      label: 'Primary',
      street: 'Blk 2, Lot 10, Example Street, Makati City',
      details: '1200 · Philippines',
    },
  ]);

  // Modals
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newPostal, setNewPostal] = useState('');

  // Password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState(false);

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newStreet.trim()) return;
    const newAddr = {
      id: Date.now(),
      isPrimary: addresses.length === 0,
      label: addresses.length === 0 ? 'Primary' : 'Secondary',
      street: `${newStreet}, ${newCity}`,
      details: `${newPostal} · Philippines`,
    };
    setAddresses([...addresses, newAddr]);
    setNewStreet('');
    setNewCity('');
    setNewPostal('');
    setShowAddAddressModal(false);
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    setSecuritySuccess(true);
    setTimeout(() => {
      setSecuritySuccess(false);
      setCurrentPass('');
      setNewPass('');
      alert('Password updated successfully!');
    }, 600);
  };

  return (
    <div className="customerprofile-page">
      <CustomerNavbar
        user={user}
        onNavigateHome={onNavigateHome}
        onNavigateShop={onNavigateShop}
        onNavigateCart={onNavigateCart}
        onNavigateProfile={onNavigateProfile}
        onNavigateOrders={onNavigateOrders}
        onLogout={onLogout}
      />

      {/* 2. MAIN PROFILE CONTENT */}
      <main className="customerprofile-main">
        {/* Title Area */}
        <div className="customerprofile-header-area">
          <h1 className="customerprofile-title">My Profile</h1>
          <p className="customerprofile-subtitle">
            Manage personal information, addresses, and order history.
          </p>
        </div>

        {/* 2-Column Content Layout (Matching CUS-10) */}
        <div className="customerprofile-layout">
          {/* Left Sidebar Card */}
          <aside className="customerprofile-sidebar-card">
            {/* Avatar Circle with Initials PM */}
            <div className="customerprofile-avatar">
              <span>PM</span>
            </div>

            <h2 className="customerprofile-name">{displayName}</h2>
            <p className="customerprofile-role">Customer account</p>

            {/* Sidebar Navigation */}
            <nav className="customerprofile-menu">
              <button
                type="button"
                className={`customerprofile-menu-item ${
                  activeSection === 'personal' ? 'active' : ''
                }`}
                onClick={() => setActiveSection('personal')}
              >
                Personal Information
              </button>

              <button
                type="button"
                className={`customerprofile-menu-item ${
                  activeSection === 'addresses' ? 'active' : ''
                }`}
                onClick={() => setActiveSection('addresses')}
              >
                Addresses
              </button>

              <button
                type="button"
                className={`customerprofile-menu-item ${
                  activeSection === 'security' ? 'active' : ''
                }`}
                onClick={() => setActiveSection('security')}
              >
                Password &amp; Security
              </button>

              <button
                type="button"
                className="customerprofile-menu-item logout-item"
                onClick={() => {
                  if (onLogout) onLogout();
                  else alert('Logged out successfully.');
                }}
              >
                Log Out
              </button>
            </nav>
          </aside>

          {/* Right Area: Dynamic Views */}
          <div className="customerprofile-content-area">
            {/* 1. PERSONAL INFORMATION VIEW (CUS-10) */}
            {activeSection === 'personal' && (
              <>
                {/* Personal Information Card */}
                <div className="customerprofile-card">
                  <h3 className="customerprofile-card-title">Personal Information</h3>

                  <div className="customerprofile-info-grid">
                    <div className="customerprofile-info-field">
                      <span className="customerprofile-field-label">Full name</span>
                      <span className="customerprofile-field-val">{fullName}</span>
                    </div>

                    <div className="customerprofile-info-field">
                      <span className="customerprofile-field-label">Email</span>
                      <span className="customerprofile-field-val">{email}</span>
                    </div>

                    <div className="customerprofile-info-field">
                      <span className="customerprofile-field-label">Contact number</span>
                      <span className="customerprofile-field-val">{contactNumber}</span>
                    </div>

                    <div className="customerprofile-info-field">
                      <span className="customerprofile-field-label">Member since</span>
                      <span className="customerprofile-field-val">{memberSince}</span>
                    </div>
                  </div>
                </div>

                {/* Saved Address Card */}
                <div className="customerprofile-card" style={{ marginTop: '28px' }}>
                  <h3 className="customerprofile-card-title">Saved Address</h3>

                  <div className="customerprofile-addresses-list">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="customerprofile-address-box">
                        <span className="customerprofile-address-badge">{addr.label}</span>
                        <p className="customerprofile-address-street">{addr.street}</p>
                        <p className="customerprofile-address-details">{addr.details}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="customerprofile-add-btn"
                    onClick={() => setShowAddAddressModal(true)}
                  >
                    Add Address
                  </button>
                </div>
              </>
            )}

            {/* 2. ADDRESSES VIEW */}
            {activeSection === 'addresses' && (
              <div className="customerprofile-card">
                <div className="customerprofile-card-header-row">
                  <h3 className="customerprofile-card-title">My Delivery Addresses</h3>
                  <button
                    type="button"
                    className="customerprofile-add-btn"
                    onClick={() => setShowAddAddressModal(true)}
                  >
                    + Add New Address
                  </button>
                </div>

                <div className="customerprofile-addresses-list" style={{ marginTop: '20px' }}>
                  {addresses.map((addr) => (
                    <div key={addr.id} className="customerprofile-address-box">
                      <div className="customerprofile-address-top">
                        <span className="customerprofile-address-badge">{addr.label}</span>
                        {addr.isPrimary && (
                          <span className="customerprofile-default-tag">Default Delivery</span>
                        )}
                      </div>
                      <p className="customerprofile-address-street">{addr.street}</p>
                      <p className="customerprofile-address-details">{addr.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. PASSWORD & SECURITY VIEW */}
            {activeSection === 'security' && (
              <div className="customerprofile-card">
                <h3 className="customerprofile-card-title">Password &amp; Security</h3>
                <p className="customerprofile-section-hint">
                  Ensure your account is protected with a secure password.
                </p>

                <form onSubmit={handleSaveSecurity} className="customerprofile-security-form">
                  <div className="customerprofile-input-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      className="customerprofile-input"
                    />
                  </div>

                  <div className="customerprofile-input-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Enter minimum 8 characters"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="customerprofile-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={securitySuccess}
                    className="customerprofile-save-btn"
                  >
                    {securitySuccess ? 'Saving...' : 'Update Password'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div className="customerprofile-modal-backdrop" onClick={() => setShowAddAddressModal(false)}>
          <div className="customerprofile-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="customerprofile-modal-header">
              <h3>Add Delivery Address</h3>
              <button
                type="button"
                className="customerprofile-modal-close"
                onClick={() => setShowAddAddressModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddAddress}>
              <div className="customerprofile-input-group">
                <label>Address Line / Street</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unit 4B, Emerald Tower, F. Ortigas Jr. Rd"
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  className="customerprofile-input"
                />
              </div>

              <div className="customerprofile-input-group">
                <label>City / Municipality</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pasig City, Metro Manila"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="customerprofile-input"
                />
              </div>

              <div className="customerprofile-input-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1605"
                  value={newPostal}
                  onChange={(e) => setNewPostal(e.target.value)}
                  className="customerprofile-input"
                />
              </div>

              <div className="customerprofile-modal-actions">
                <button
                  type="button"
                  className="customerprofile-modal-cancel"
                  onClick={() => setShowAddAddressModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="customerprofile-save-btn">
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}