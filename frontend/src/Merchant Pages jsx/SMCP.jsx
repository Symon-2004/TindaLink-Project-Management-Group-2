import { useState } from 'react';
import '../Merchant Pages Styling/SMCP.css';
import MerchantSidebar from './MerchantSidebar.jsx';

const mockProducts = [
  {
    id: 'PRD-001',
    name: 'Everyday Tote Bag',
    defaultCaption: 'Meet your new everyday favorite ✨ Locally made and ready to go.',
  },
  {
    id: 'PRD-002',
    name: 'Wireless Mini Speaker',
    defaultCaption: 'Big sound in a compact build 🎶 Take your playlist anywhere.',
  },
  {
    id: 'PRD-003',
    name: 'Organic Gift Set',
    defaultCaption: 'Thoughtfully curated and eco-friendly 🌿 Perfect for gifting.',
  },
  {
    id: 'PRD-004',
    name: 'Canvas Sneakers',
    defaultCaption: 'Clean, classic, and built for daily comfort 👟 Shop now!',
  },
];

const SMCP = ({ onNavigate, onLogout }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(mockProducts[0].id);
  const [caption, setCaption] = useState(mockProducts[0].defaultCaption);
  const [postingStatus, setPostingStatus] = useState('Ready to publish');
  const [isPublishing, setIsPublishing] = useState(false);

  const handleToggleConnection = () => {
    setIsConnected((prev) => {
      const nextState = !prev;
      setPostingStatus(
        nextState ? 'Ready to publish' : 'Connect Instagram Business to publish'
      );
      return nextState;
    });
  };

  const handleProductChange = (e) => {
    const chosenId = e.target.value;
    setSelectedProductId(chosenId);
    const chosenProduct = mockProducts.find((item) => item.id === chosenId);
    if (chosenProduct) {
      setCaption(chosenProduct.defaultCaption);
    }
    if (isConnected) {
      setPostingStatus('Ready to publish');
    }
  };

  const handleCrossPost = () => {
    if (!isConnected || !caption.trim() || isPublishing) return;

    setIsPublishing(true);
    setPostingStatus('Publishing to Instagram...');

    setTimeout(() => {
      setIsPublishing(false);
      setPostingStatus('Published to @TindaLink_AI');
    }, 900);
  };

  return (
    <div className="dashboard-container msidebar-layout">
      <MerchantSidebar
        activeTab="social-media"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="main-content msidebar-main">
        <header className="top-header msidebar-top-header">
          <h1>Merchant Portal</h1>
        </header>

        <div className="smcp-page">
      {/* Header */}
      <header className="smcp-header">
        <h1 className="smcp-title">Social Media Cross-Posting</h1>
        <p className="smcp-subtitle">
          Connect Instagram Business and publish products through supported Meta services.
        </p>
      </header>

      {/* Instagram Business Connection Card */}
      <section className="smcp-card smcp-connection-card">
        <h2 className="smcp-card-title">Instagram Business</h2>

        <div className="smcp-account-row">
          <div className="smcp-account-info">
            <div className="smcp-avatar" aria-hidden="true" />
            <div className="smcp-account-meta">
              <span className="smcp-handle">
                {isConnected ? '@TindaLink_AI' : 'Not Connected'}
              </span>
              <span
                className={`smcp-conn-status ${
                  isConnected ? 'connected' : 'disconnected'
                }`}
              >
                {isConnected ? 'Connected via Meta' : 'Disconnected'}
              </span>
            </div>
          </div>

          <button
            type="button"
            className={`smcp-conn-btn ${isConnected ? 'disconnect' : 'connect'}`}
            onClick={handleToggleConnection}
          >
            {isConnected ? 'Disconnect' : 'Connect Instagram'}
          </button>
        </div>
      </section>

      {/* Cross-post Product Card */}
      <section className="smcp-card smcp-post-card">
        <h2 className="smcp-card-title">Cross-post Product</h2>

        <div className="smcp-form-group smcp-select-group">
          <label htmlFor="smcp-product-select" className="smcp-label">
            Select product
          </label>
          <div className="smcp-select-wrapper">
            <select
              id="smcp-product-select"
              className="smcp-select"
              value={selectedProductId}
              onChange={handleProductChange}
            >
              {mockProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="smcp-form-group">
          <label htmlFor="smcp-caption-input" className="smcp-label">
            Caption
          </label>
          <textarea
            id="smcp-caption-input"
            className="smcp-textarea"
            rows="3"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
              if (isConnected && postingStatus !== 'Ready to publish') {
                setPostingStatus('Ready to publish');
              }
            }}
            placeholder="Write a caption for your Instagram post..."
          />
        </div>

        {/* Posting Status Banner */}
        <div className="smcp-status-box">
          <span className="smcp-status-label">Posting status</span>
          <span
            className={`smcp-status-value ${
              postingStatus.startsWith('Published') ? 'published' : ''
            }`}
          >
            {postingStatus}
          </span>
        </div>

        <div className="smcp-actions">
          <button
            type="button"
            className="smcp-submit-btn"
            onClick={handleCrossPost}
            disabled={!isConnected || !caption.trim() || isPublishing}
          >
            {isPublishing ? 'Publishing...' : 'Cross-post to Instagram'}
          </button>
        </div>
      </section>
        </div>
      </main>
    </div>
  );
};

export default SMCP;