import { useState } from 'react';
import './SocialMediaCrossPosting.css';

const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'Everyday Tote Bag', price: 450 },
  { id: 'p2', name: 'Wireless Mini Speaker', price: 799 },
  { id: 'p3', name: 'Handmade Soy Candle', price: 299 },
  { id: 'p4', name: 'Organic Gift Set', price: 650 },
  { id: 'p5', name: 'Canvas Sneakers', price: 1499 },
  { id: 'p6', name: 'Mini Ring Light', price: 599 },
];

export default function SocialMediaCrossPosting({
  products: propProducts,
  onNavigate,
  onSwitchToCustomer,
  onLogout,
}) {
  const products = propProducts ?? DEFAULT_PRODUCTS;
  const [isConnected, setIsConnected] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || 'p1');
  const [caption, setCaption] = useState(
    'Meet your new everyday favorite ✨ Locally made and ready to go.'
  );
  const [postingStatus, setPostingStatus] = useState('Ready to publish');
  const [publishedHistory, setPublishedHistory] = useState([]);

  const selectedProduct =
    products.find((p) => p.id === selectedProductId) || products[0];

  const navigateTo = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleToggleConnection = () => {
    if (isConnected) {
      setIsConnected(false);
      setPostingStatus('Instagram account disconnected. Reconnect to publish.');
    } else {
      setIsConnected(true);
      setPostingStatus('Ready to publish');
    }
  };

  const handleCrossPost = (e) => {
    e.preventDefault();
    if (!isConnected) {
      setPostingStatus('Please connect your Instagram Business account first.');
      return;
    }
    if (!caption.trim()) {
      setPostingStatus('Please write a caption before publishing.');
      return;
    }

    const productName = selectedProduct?.name || 'Selected Product';
    setPostingStatus(`Published "${productName}" to @TindaLink via Meta!`);
    setPublishedHistory((prev) => [
      {
        id: `post-${Date.now()}`,
        productName,
        caption: caption.trim(),
        time: 'Just now',
      },
      ...prev.slice(0, 2),
    ]);
  };

  return (
    <div className="smcp-layout">
      {/* Dark Navy/Purple Sidebar */}
      <aside className="smcp-sidebar" aria-label="Merchant Navigation">
        <div>
          <div className="smcp-brand">
            <span className="smcp-brand-name">TindaLink</span>
            <span className="smcp-brand-role">MERCHANT</span>
          </div>

          <nav className="smcp-nav">
            <button
              type="button"
              className="smcp-nav-item"
              onClick={() => navigateTo('dashboard')}
            >
              Dashboard
            </button>
            <button
              type="button"
              className="smcp-nav-item"
              onClick={() => navigateTo('products')}
            >
              Products
            </button>
            <button
              type="button"
              className="smcp-nav-item"
              onClick={() => navigateTo('inventory')}
            >
              Inventory
            </button>
            <button
              type="button"
              className="smcp-nav-item"
              onClick={() => navigateTo('orders')}
            >
              Orders
            </button>
            <button
              type="button"
              className="smcp-nav-item"
              onClick={() => navigateTo('payments')}
            >
              Payments
            </button>
            <button
              type="button"
              className="smcp-nav-item"
              onClick={() => navigateTo('store')}
            >
              Store
            </button>
            <button
              type="button"
              className="smcp-nav-item active"
              onClick={() => navigateTo('social')}
            >
              Social Media
            </button>
            <button
              type="button"
              className="smcp-nav-item"
              onClick={() => navigateTo('settings')}
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="smcp-sidebar-footer">TindaLink</div>
      </aside>

      {/* Main Content Shell */}
      <div className="smcp-content-shell">
        <header className="smcp-topbar">
          <span className="smcp-topbar-title">Merchant Portal</span>
          {(onSwitchToCustomer || onLogout) && (
            <div className="smcp-topbar-actions">
              {onSwitchToCustomer && (
                <button
                  type="button"
                  className="smcp-topbar-btn"
                  onClick={onSwitchToCustomer}
                >
                  Customer View
                </button>
              )}
              {onLogout && (
                <button
                  type="button"
                  className="smcp-topbar-btn smcp-topbar-btn-outline"
                  onClick={onLogout}
                >
                  Log Out
                </button>
              )}
            </div>
          )}
        </header>

        <main className="smcp-main">
          <div className="smcp-page-header">
            <h1 className="smcp-page-title">Social Media Cross-Posting</h1>
            <p className="smcp-page-subtitle">
              Connect Instagram Business and publish products through supported Meta services.
            </p>
          </div>

          {/* Instagram Business Connection Card */}
          <section className="smcp-card smcp-ig-card">
            <h2 className="smcp-card-title">Instagram Business</h2>
            <div className="smcp-ig-row">
              <div className="smcp-ig-left">
                <div className="smcp-ig-avatar" aria-hidden="true" />
                <div>
                  <div className="smcp-ig-handle">@TindaLink</div>
                  <div
                    className={`smcp-ig-status ${
                      isConnected ? 'is-connected' : 'is-disconnected'
                    }`}
                  >
                    {isConnected ? 'Connected via Meta' : 'Disconnected'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="smcp-disconnect-btn"
                onClick={handleToggleConnection}
              >
                {isConnected ? 'Disconnect' : 'Connect Account'}
              </button>
            </div>
          </section>

          {/* Cross-post Product Card */}
          <form className="smcp-card" onSubmit={handleCrossPost}>
            <h2 className="smcp-card-title">Cross-post Product</h2>

            <div className="smcp-field">
              <label htmlFor="smcp-product">Select product</label>
              <select
                id="smcp-product"
                value={selectedProduct?.id || ''}
                onChange={(e) => {
                  setSelectedProductId(e.target.value);
                  if (isConnected) {
                    setPostingStatus('Ready to publish');
                  }
                }}
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="smcp-field">
              <label htmlFor="smcp-caption">Caption</label>
              <textarea
                id="smcp-caption"
                rows={4}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption for your Instagram post..."
              />
            </div>

            <div className="smcp-status-box" role="status">
              <div className="smcp-status-label">Posting status</div>
              <div className="smcp-status-value">{postingStatus}</div>
            </div>

            {publishedHistory.length > 0 && (
              <div className="smcp-recent-posts">
                {publishedHistory.map((post) => (
                  <div key={post.id} className="smcp-recent-item">
                    <span>
                      Posted <strong>{post.productName}</strong> to @TindaLink
                    </span>
                    <small>{post.time}</small>
                  </div>
                ))}
              </div>
            )}

            <div className="smcp-actions-row">
              <button type="submit" className="smcp-publish-btn">
                Cross-post to Instagram
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}