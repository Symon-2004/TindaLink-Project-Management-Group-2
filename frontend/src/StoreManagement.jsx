import { useState } from 'react';
import './StoreManagement.css';

const DEFAULT_STORE = {
  name: 'TindaLink',
  description: 'Local lifestyle & handmade goods',
  contact: '09xx xxx xxxx · tindalink@email.com',
  policies: 'Returns accepted within 7 days for eligible items.',
};

export default function StoreManagement({
  storeInfo: propStoreInfo,
  onSaveStore,
  onNavigate,
  onSwitchToCustomer,
  onLogout,
}) {
  const initialStore = propStoreInfo ?? DEFAULT_STORE;
  const [storeName, setStoreName] = useState(initialStore.name);
  const [storeDescription, setStoreDescription] = useState(initialStore.description);
  const [contactInfo, setContactInfo] = useState(initialStore.contact);
  const [storePolicies, setStorePolicies] = useState(initialStore.policies);
  const [savedMessage, setSavedMessage] = useState('');

  const navigateTo = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      name: storeName.trim() || 'TindaLink',
      description: storeDescription.trim() || 'Local lifestyle & handmade goods',
      contact: contactInfo.trim(),
      policies: storePolicies.trim(),
    };

    if (onSaveStore) {
      onSaveStore(updated);
    }
    setSavedMessage('Store information and policies updated successfully.');
  };

  return (
    <div className="sm-layout">
      {/* Dark Navy/Purple Sidebar */}
      <aside className="sm-sidebar" aria-label="Merchant Navigation">
        <div>
          <div className="sm-brand">
            <span className="sm-brand-name">TindaLink</span>
            <span className="sm-brand-role">MERCHANT</span>
          </div>

          <nav className="sm-nav">
            <button
              type="button"
              className="sm-nav-item"
              onClick={() => navigateTo('dashboard')}
            >
              Dashboard
            </button>
            <button
              type="button"
              className="sm-nav-item"
              onClick={() => navigateTo('products')}
            >
              Products
            </button>
            <button
              type="button"
              className="sm-nav-item"
              onClick={() => navigateTo('inventory')}
            >
              Inventory
            </button>
            <button
              type="button"
              className="sm-nav-item"
              onClick={() => navigateTo('orders')}
            >
              Orders
            </button>
            <button
              type="button"
              className="sm-nav-item"
              onClick={() => navigateTo('payments')}
            >
              Payments
            </button>
            <button
              type="button"
              className="sm-nav-item active"
              onClick={() => navigateTo('store')}
            >
              Store
            </button>
            <button
              type="button"
              className="sm-nav-item"
              onClick={() => navigateTo('social')}
            >
              Social Media
            </button>
            <button
              type="button"
              className="sm-nav-item"
              onClick={() => navigateTo('settings')}
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="sm-sidebar-footer">TindaLink</div>
      </aside>

      {/* Main Content Shell */}
      <div className="sm-content-shell">
        <header className="sm-topbar">
          <span className="sm-topbar-title">Merchant Portal</span>
          {(onSwitchToCustomer || onLogout) && (
            <div className="sm-topbar-actions">
              {onSwitchToCustomer && (
                <button
                  type="button"
                  className="sm-topbar-btn"
                  onClick={onSwitchToCustomer}
                >
                  Customer View
                </button>
              )}
              {onLogout && (
                <button
                  type="button"
                  className="sm-topbar-btn sm-topbar-btn-outline"
                  onClick={onLogout}
                >
                  Log Out
                </button>
              )}
            </div>
          )}
        </header>

        <main className="sm-main">
          <div className="sm-page-header">
            <h1 className="sm-page-title">Store Management</h1>
            <p className="sm-page-subtitle">
              Customize store branding, description, contact details, and policies.
            </p>
          </div>

          {savedMessage && (
            <div className="sm-feedback-banner" role="status">
              <span>{savedMessage}</span>
              <button
                type="button"
                className="sm-feedback-close"
                onClick={() => setSavedMessage('')}
                aria-label="Dismiss message"
              >
                ×
              </button>
            </div>
          )}

          {/* Store Information Card */}
          <form className="sm-card" onSubmit={handleSubmit}>
            <h2 className="sm-card-title">Store Information</h2>

            {/* Lavender Store Preview Banner */}
            <div className="sm-store-banner">
              <div className="sm-store-avatar" aria-hidden="true" />
              <div className="sm-store-banner-text">
                <div className="sm-store-banner-name">
                  {storeName.trim() || 'TindaLink'}
                </div>
                <div className="sm-store-banner-desc">
                  {storeDescription.trim() || 'Local lifestyle & handmade goods'}
                </div>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="sm-form-fields">
              <div className="sm-field">
                <label htmlFor="sm-store-name">Store name</label>
                <input
                  id="sm-store-name"
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  required
                />
              </div>

              <div className="sm-field">
                <label htmlFor="sm-store-desc">Store description</label>
                <input
                  id="sm-store-desc"
                  type="text"
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                />
              </div>

              <div className="sm-field">
                <label htmlFor="sm-store-contact">Contact information</label>
                <input
                  id="sm-store-contact"
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                />
              </div>

              <div className="sm-field">
                <label htmlFor="sm-store-policies">Store policies</label>
                <input
                  id="sm-store-policies"
                  type="text"
                  value={storePolicies}
                  onChange={(e) => setStorePolicies(e.target.value)}
                />
              </div>
            </div>

            <div className="sm-actions-row">
              <button type="submit" className="sm-save-btn">
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}