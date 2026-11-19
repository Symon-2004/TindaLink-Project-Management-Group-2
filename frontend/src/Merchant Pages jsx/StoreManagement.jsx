import { useState } from 'react';
import '../Merchant Pages Styling/StoreManagement.css';
import MerchantSidebar from './MerchantSidebar.jsx';

const StoreManagement = ({ onNavigate, onLogout }) => {
  const [storeInfo, setStoreInfo] = useState({
    name: 'TindaLink AI',
    description: 'Local lifestyle & handmade goods',
    contact: '09xx xxx xxxx · tindalink@email.com',
    policies: 'Returns accepted within 7 days for eligible items.',
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (isSaved) setIsSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="dashboard-container msidebar-layout">
      <MerchantSidebar
        activeTab="store"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="main-content msidebar-main">
        <header className="top-header msidebar-top-header">
          <h1>Merchant Portal</h1>
        </header>

        <div className="sm-page">
      {/* Header */}
      <header className="sm-header">
        <h1 className="sm-title">Store Management</h1>
        <p className="sm-subtitle">
          Customize store branding, description, contact details, and policies.
        </p>
      </header>

      {/* Store Information Card */}
      <section className="sm-card">
        <h2 className="sm-card-title">Store Information</h2>

        {/* Live Store Banner Preview */}
        <div className="sm-banner-preview">
          <div className="sm-store-avatar" aria-hidden="true" />
          <div className="sm-banner-text">
            <span className="sm-banner-name">
              {storeInfo.name.trim() || 'Store Name'}
            </span>
            <span className="sm-banner-desc">
              {storeInfo.description.trim() || 'Store description'}
            </span>
          </div>
        </div>

        {/* Store Form */}
        <form className="sm-form" onSubmit={handleSave}>
          <div className="sm-form-group">
            <label htmlFor="sm-store-name" className="sm-label">
              Store name
            </label>
            <input
              id="sm-store-name"
              name="name"
              type="text"
              className="sm-input"
              value={storeInfo.name}
              onChange={handleChange}
              placeholder="Enter store name"
            />
          </div>

          <div className="sm-form-group">
            <label htmlFor="sm-store-desc" className="sm-label">
              Store description
            </label>
            <input
              id="sm-store-desc"
              name="description"
              type="text"
              className="sm-input"
              value={storeInfo.description}
              onChange={handleChange}
              placeholder="Enter store description"
            />
          </div>

          <div className="sm-form-group">
            <label htmlFor="sm-store-contact" className="sm-label">
              Contact information
            </label>
            <input
              id="sm-store-contact"
              name="contact"
              type="text"
              className="sm-input"
              value={storeInfo.contact}
              onChange={handleChange}
              placeholder="Enter phone number and email"
            />
          </div>

          <div className="sm-form-group">
            <label htmlFor="sm-store-policies" className="sm-label">
              Store policies
            </label>
            <input
              id="sm-store-policies"
              name="policies"
              type="text"
              className="sm-input"
              value={storeInfo.policies}
              onChange={handleChange}
              placeholder="Enter return and store policies"
            />
          </div>

          <div className="sm-actions">
            {isSaved && (
              <span className="sm-saved-msg">Changes saved!</span>
            )}
            <button type="submit" className="sm-save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </section>
        </div>
      </main>
    </div>
  );
};

export default StoreManagement;