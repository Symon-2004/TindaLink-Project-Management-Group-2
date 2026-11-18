import { useState } from 'react';
import './MerchantSettings.css';

export default function MerchantSettings({
  userEmail = 'peachy@email.com',
  userName = 'Peachy Mangaoang',
  storeName = 'TindaLink',
  onSaveAccount,
  onNavigate,
  onSwitchToCustomer,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState('account'); // 'account' | 'store' | 'payment' | 'security'

  // Account Information fields
  const [fullName, setFullName] = useState(userName || 'Peachy Mangaoang');
  const [email, setEmail] = useState(userEmail || 'peachy@email.com');
  const [contactNumber, setContactNumber] = useState('09xx xxx xxxx');
  const [username, setUsername] = useState('@Tindalink');

  // Store Settings fields
  const [lowStockThreshold, setLowStockThreshold] = useState('5');
  const [orderAlertsEnabled, setOrderAlertsEnabled] = useState(true);

  // Payment Settings fields
  const [gcashNumber, setGcashNumber] = useState('09xx xxx xxxx');
  const [codEnabled, setCodEnabled] = useState(true);

  // Security fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [savedNotice, setSavedNotice] = useState('');

  const navigateTo = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    if (activeTab === 'security') {
      if (!newPassword || newPassword !== confirmPassword) {
        setSavedNotice('Please make sure your new password and confirmation match.');
        return;
      }
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSavedNotice('Security password updated successfully.');
      return;
    }

    if (onSaveAccount) {
      onSaveAccount({
        fullName,
        email,
        contactNumber,
        username,
        gcashNumber,
        codEnabled,
        lowStockThreshold: Number(lowStockThreshold) || 5,
      });
    }

    setSavedNotice('Settings saved successfully.');
  };

  return (
    <div className="ms-layout">
      {/* Dark Navy/Purple Sidebar */}
      <aside className="ms-sidebar" aria-label="Merchant Navigation">
        <div>
          <div className="ms-brand">
            <span className="ms-brand-name">TindaLink</span>
            <span className="ms-brand-role">MERCHANT</span>
          </div>

          <nav className="ms-nav">
            <button
              type="button"
              className="ms-nav-item"
              onClick={() => navigateTo('dashboard')}
            >
              Dashboard
            </button>
            <button
              type="button"
              className="ms-nav-item"
              onClick={() => navigateTo('products')}
            >
              Products
            </button>
            <button
              type="button"
              className="ms-nav-item"
              onClick={() => navigateTo('inventory')}
            >
              Inventory
            </button>
            <button
              type="button"
              className="ms-nav-item"
              onClick={() => navigateTo('orders')}
            >
              Orders
            </button>
            <button
              type="button"
              className="ms-nav-item"
              onClick={() => navigateTo('payments')}
            >
              Payments
            </button>
            <button
              type="button"
              className="ms-nav-item"
              onClick={() => navigateTo('store')}
            >
              Store
            </button>
            <button
              type="button"
              className="ms-nav-item"
              onClick={() => navigateTo('social')}
            >
              Social Media
            </button>
            <button
              type="button"
              className="ms-nav-item active"
              onClick={() => navigateTo('settings')}
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="ms-sidebar-footer">TindaLink</div>
      </aside>

      {/* Main Content Shell */}
      <div className="ms-content-shell">
        <header className="ms-topbar">
          <span className="ms-topbar-title">Merchant Portal</span>
          {(onSwitchToCustomer || onLogout) && (
            <div className="ms-topbar-actions">
              {onSwitchToCustomer && (
                <button
                  type="button"
                  className="ms-topbar-btn"
                  onClick={onSwitchToCustomer}
                >
                  Customer View
                </button>
              )}
              {onLogout && (
                <button
                  type="button"
                  className="ms-topbar-btn ms-topbar-btn-outline"
                  onClick={onLogout}
                >
                  Log Out
                </button>
              )}
            </div>
          )}
        </header>

        <main className="ms-main">
          <div className="ms-page-header">
            <h1 className="ms-page-title">Merchant Profile &amp; Settings</h1>
            <p className="ms-page-subtitle">
              Manage account information, store settings, payment methods, and security.
            </p>
          </div>

          {savedNotice && (
            <div className="ms-feedback-banner" role="status">
              <span>{savedNotice}</span>
              <button
                type="button"
                className="ms-feedback-close"
                onClick={() => setSavedNotice('')}
                aria-label="Dismiss notice"
              >
                ×
              </button>
            </div>
          )}

          <div className="ms-grid">
            {/* Left Profile Navigation Card */}
            <aside className="ms-profile-card">
              <div className="ms-avatar-circle">TL</div>
              <div className="ms-profile-name">{storeName || 'TindaLink'}</div>
              <div className="ms-profile-role">Business Owner</div>

              <div className="ms-profile-nav">
                <button
                  type="button"
                  className={`ms-profile-link ${activeTab === 'account' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('account');
                    setSavedNotice('');
                  }}
                >
                  Account Information
                </button>
                <button
                  type="button"
                  className={`ms-profile-link ${activeTab === 'store' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('store');
                    setSavedNotice('');
                  }}
                >
                  Store Settings
                </button>
                <button
                  type="button"
                  className={`ms-profile-link ${activeTab === 'payment' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('payment');
                    setSavedNotice('');
                  }}
                >
                  Payment Settings
                </button>
                <button
                  type="button"
                  className={`ms-profile-link ${activeTab === 'security' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('security');
                    setSavedNotice('');
                  }}
                >
                  Security
                </button>
                <button
                  type="button"
                  className="ms-profile-link"
                  onClick={() => {
                    if (onLogout) {
                      onLogout();
                    } else {
                      setSavedNotice('Logged out of merchant session.');
                    }
                  }}
                >
                  Log Out
                </button>
              </div>
            </aside>

            {/* Right Settings Form Card */}
            <form className="ms-form-card" onSubmit={handleSaveChanges}>
              {activeTab === 'account' && (
                <>
                  <h2 className="ms-section-title">Account Information</h2>

                  <div className="ms-fields-stack">
                    <div className="ms-field">
                      <label htmlFor="ms-full-name">Full name</label>
                      <input
                        id="ms-full-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>

                    <div className="ms-field">
                      <label htmlFor="ms-email">Email</label>
                      <input
                        id="ms-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="ms-field">
                      <label htmlFor="ms-contact">Contact number</label>
                      <input
                        id="ms-contact"
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                      />
                    </div>

                    <div className="ms-field">
                      <label htmlFor="ms-username">Username</label>
                      <input
                        id="ms-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>

                  <h3 className="ms-subsection-title">Payment Settings</h3>
                  <div className="ms-payment-summary">
                    <div className="ms-summary-row">
                      <span className="ms-summary-label">GCash</span>
                      <span className="ms-summary-value">{gcashNumber}</span>
                    </div>
                    <div className="ms-summary-row">
                      <span className="ms-summary-label">Cash on Delivery</span>
                      <span className="ms-summary-value">
                        {codEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'store' && (
                <>
                  <h2 className="ms-section-title">Store Settings</h2>
                  <div className="ms-fields-stack">
                    <div className="ms-field">
                      <label htmlFor="ms-threshold">Low stock alert threshold</label>
                      <input
                        id="ms-threshold"
                        type="number"
                        min="1"
                        value={lowStockThreshold}
                        onChange={(e) => setLowStockThreshold(e.target.value)}
                      />
                    </div>

                    <div className="ms-toggle-row">
                      <div>
                        <div className="ms-toggle-title">Order notification emails</div>
                        <div className="ms-toggle-desc">
                          Receive instant alerts when a customer places a new order.
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`ms-toggle-btn ${orderAlertsEnabled ? 'is-on' : ''}`}
                        onClick={() => setOrderAlertsEnabled((prev) => !prev)}
                      >
                        {orderAlertsEnabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'payment' && (
                <>
                  <h2 className="ms-section-title">Payment Settings</h2>
                  <div className="ms-fields-stack">
                    <div className="ms-field">
                      <label htmlFor="ms-gcash">Seller GCash Account Number</label>
                      <input
                        id="ms-gcash"
                        type="text"
                        value={gcashNumber}
                        onChange={(e) => setGcashNumber(e.target.value)}
                      />
                    </div>

                    <div className="ms-toggle-row">
                      <div>
                        <div className="ms-toggle-title">Cash on Delivery (COD)</div>
                        <div className="ms-toggle-desc">
                          Allow customers to pay in cash upon order delivery.
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`ms-toggle-btn ${codEnabled ? 'is-on' : ''}`}
                        onClick={() => setCodEnabled((prev) => !prev)}
                      >
                        {codEnabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'security' && (
                <>
                  <h2 className="ms-section-title">Security</h2>
                  <div className="ms-fields-stack">
                    <div className="ms-field">
                      <label htmlFor="ms-curr-pass">Current password</label>
                      <input
                        id="ms-curr-pass"
                        type="password"
                        placeholder="•••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>

                    <div className="ms-field">
                      <label htmlFor="ms-new-pass">New password</label>
                      <input
                        id="ms-new-pass"
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>

                    <div className="ms-field">
                      <label htmlFor="ms-conf-pass">Confirm new password</label>
                      <input
                        id="ms-conf-pass"
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="ms-actions-row">
                <button type="submit" className="ms-save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}