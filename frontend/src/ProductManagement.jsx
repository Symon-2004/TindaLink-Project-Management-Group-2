import { useEffect, useState } from 'react';
import './ProductManagement.css';

const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'Everyday Tote Bag', category: 'Fashion', price: 450, stock: 24, lowThreshold: 5, description: 'Durable canvas tote bag for daily errands.' },
  { id: 'p2', name: 'Wireless Mini Speaker', category: 'Electronics', price: 799, stock: 3, lowThreshold: 5, description: 'Compact Bluetooth speaker with rich bass.' },
  { id: 'p3', name: 'Handmade Soy Candle', category: 'Home', price: 299, stock: 18, lowThreshold: 5, description: 'Natural vanilla and lavender hand-poured candle.' },
  { id: 'p4', name: 'Organic Gift Set', category: 'Beauty', price: 650, stock: 4, lowThreshold: 5, description: 'Curated herbal skincare bundle.' },
  { id: 'p5', name: 'Canvas Sneakers', category: 'Fashion', price: 1499, stock: 12, lowThreshold: 5, description: 'Breathable everyday low-top sneakers.' },
  { id: 'p6', name: 'Mini Ring Light', category: 'Electronics', price: 599, stock: 0, lowThreshold: 5, description: 'Clip-on LED ring light for video calls.' },
];

const CATEGORIES = ['Fashion', 'Electronics', 'Home', 'Beauty', 'Food', 'Accessories'];

function buildProductSlug(product) {
  const cleanName = String(product?.name || 'product')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const cleanId = String(product?.id || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, '');
  return cleanId ? `${cleanName || 'product'}-${cleanId}` : cleanName || 'product';
}

function getStorefrontBaseUrl() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return 'https://tindalink.shop';
}

export default function ProductManagement({
  products: propProducts,
  storeName = 'TindaLink',
  onNavigate,
  onUpdateProduct,
  onDeleteProduct,
  onSwitchToCustomer,
  onLogout,
}) {
  const [localProducts, setLocalProducts] = useState(DEFAULT_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [shareTarget, setShareTarget] = useState(null);
  const [copiedLinkType, setCopiedLinkType] = useState('');
  const [portalNotice, setPortalNotice] = useState('');

  const products = propProducts ?? localProducts;

  useEffect(() => {
    if (!shareTarget) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShareTarget(null);
        setCopiedLinkType('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shareTarget]);

  const filteredProducts = products.filter((item) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const getStatusMeta = (stock, threshold = 5) => {
    if (stock <= 0) return { label: 'Out of stock', className: 'pm-badge-out' };
    if (stock <= threshold) return { label: 'Low stock', className: 'pm-badge-low' };
    return { label: 'Active', className: 'pm-badge-active' };
  };

  const navigateTo = (page, filter) => {
    if (onNavigate) {
      onNavigate(page, filter);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name.trim()) return;

    const updated = {
      ...editingProduct,
      name: editingProduct.name.trim(),
      price: Math.max(0, Number(editingProduct.price) || 0),
      stock: Math.max(0, parseInt(editingProduct.stock, 10) || 0),
    };

    if (onUpdateProduct) {
      onUpdateProduct(updated);
    } else {
      setLocalProducts((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
    }
    setEditingProduct(null);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    if (onDeleteProduct) {
      onDeleteProduct(deleteTarget.id);
    } else {
      setLocalProducts((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    }
    setDeleteTarget(null);
  };

  const openShareModal = (product) => {
    setShareTarget(product);
    setCopiedLinkType('');
  };

  const closeShareModal = () => {
    setShareTarget(null);
    setCopiedLinkType('');
  };

  const handleCopyUrl = async (url, type) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    setCopiedLinkType(type);
    setTimeout(() => {
      setCopiedLinkType((prev) => (prev === type ? '' : prev));
    }, 2600);
  };

  const shareProductLinks = shareTarget
    ? (() => {
        const baseUrl = getStorefrontBaseUrl();
        const slug = buildProductSlug(shareTarget);
        const salesPageUrl = `${baseUrl}/p/${slug}`;
        const checkoutPageUrl = `${baseUrl}/p/${slug}/checkout`;
        const formattedPrice = `₱${Number(shareTarget.price || 0).toLocaleString()}`;
        const shareSummary = `Check out ${shareTarget.name} (${formattedPrice}) at ${storeName}!`;

        return {
          salesPageUrl,
          checkoutPageUrl,
          whatsappHref: `https://wa.me/?text=${encodeURIComponent(
            `${shareSummary} ${salesPageUrl}`
          )}`,
          facebookHref: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            salesPageUrl
          )}&quote=${encodeURIComponent(shareSummary)}`,
          xHref: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareSummary
          )}&url=${encodeURIComponent(salesPageUrl)}`,
          emailHref: `mailto:?subject=${encodeURIComponent(
            `${shareTarget.name} — ${storeName}`
          )}&body=${encodeURIComponent(
            `Hi,\n\nCheck out ${shareTarget.name} (${formattedPrice}) from ${storeName}:\n\nSales Page: ${salesPageUrl}\nCheckout Page: ${checkoutPageUrl}`
          )}`,
        };
      })()
    : null;

  return (
    <div className="pm-layout">
      {/* Dark Purple Left Sidebar */}
      <aside className="pm-sidebar" aria-label="Merchant Navigation">
        <div>
          <div className="pm-brand">
            <span className="pm-brand-name">TindaLink</span>
            <span className="pm-brand-role">MERCHANT</span>
          </div>

          <nav className="pm-nav">
            <button
              type="button"
              className="pm-nav-item"
              onClick={() => navigateTo('dashboard')}
            >
              Dashboard
            </button>
            <button
              type="button"
              className="pm-nav-item active"
              onClick={() => navigateTo('products')}
            >
              Products
            </button>
            <button
              type="button"
              className="pm-nav-item"
              onClick={() => navigateTo('inventory')}
            >
              Inventory
            </button>
            <button
              type="button"
              className="pm-nav-item"
              onClick={() => navigateTo('orders')}
            >
              Orders
            </button>
            <button
              type="button"
              className="pm-nav-item"
              onClick={() => navigateTo('payments')}
            >
              Payments
            </button>
            <button
              type="button"
              className="pm-nav-item"
              onClick={() =>
                onNavigate
                  ? navigateTo('store')
                  : setPortalNotice('Storefront catalog is live and synced with Product Management.')
              }
            >
              Store
            </button>
            <button
              type="button"
              className="pm-nav-item"
              onClick={() =>
                onNavigate
                  ? navigateTo('settings')
                  : setPortalNotice('Store settings: Auto-low stock alert threshold set to 5 units.')
              }
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="pm-sidebar-footer">TindaLink</div>
      </aside>

      {/* Main Workspace */}
      <div className="pm-content-shell">
        <header className="pm-topbar">
          <span className="pm-topbar-title">Merchant Portal</span>
          {(onSwitchToCustomer || onLogout) && (
            <div className="pm-topbar-actions">
              {onSwitchToCustomer && (
                <button
                  type="button"
                  className="pm-topbar-btn"
                  onClick={onSwitchToCustomer}
                >
                  Customer View
                </button>
              )}
              {onLogout && (
                <button
                  type="button"
                  className="pm-topbar-btn pm-topbar-btn-outline"
                  onClick={onLogout}
                >
                  Log Out
                </button>
              )}
            </div>
          )}
        </header>

        <main className="pm-main">
          <div className="pm-page-header">
            <h1 className="pm-page-title">Product Management</h1>
            <p className="pm-page-subtitle">
              Create, update, and manage products available in your store.
            </p>
          </div>

          {portalNotice && (
            <div className="pm-notice-banner" role="status">
              <span>{portalNotice}</span>
              <button
                type="button"
                className="pm-notice-close"
                onClick={() => setPortalNotice('')}
                aria-label="Dismiss notice"
              >
                ×
              </button>
            </div>
          )}

          {/* Search & Add Product Bar */}
          <div className="pm-toolbar-card">
            <input
              type="text"
              className="pm-search-input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
            <button
              type="button"
              className="pm-add-btn"
              onClick={() => navigateTo('add-product')}
            >
              + Add Product
            </button>
          </div>

          {/* Products Table Card */}
          <div className="pm-table-card">
            <div className="pm-table-wrap">
              <table className="pm-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => {
                      const statusMeta = getStatusMeta(product.stock, product.lowThreshold);
                      return (
                        <tr key={product.id}>
                          <td className="pm-col-name">{product.name}</td>
                          <td className="pm-col-category">{product.category}</td>
                          <td className="pm-col-price">
                            ₱{Number(product.price).toLocaleString()}
                          </td>
                          <td className="pm-col-stock">{product.stock}</td>
                          <td>
                            <span className={`pm-status-badge ${statusMeta.className}`}>
                              {statusMeta.label}
                            </span>
                          </td>
                          <td>
                            <div className="pm-col-actions">
                              <button
                                type="button"
                                className="pm-action-btn pm-action-share"
                                onClick={() => openShareModal(product)}
                                aria-label={`Share ${product.name}`}
                              >
                                <svg
                                  className="pm-action-icon"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  aria-hidden="true"
                                >
                                  <circle cx="12" cy="3.5" r="1.75" stroke="currentColor" strokeWidth="1.4" />
                                  <circle cx="4" cy="8" r="1.75" stroke="currentColor" strokeWidth="1.4" />
                                  <circle cx="12" cy="12.5" r="1.75" stroke="currentColor" strokeWidth="1.4" />
                                  <path
                                    d="M5.55 7.1L10.45 4.4M5.55 8.9L10.45 11.6"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                  />
                                </svg>
                                <span>Share</span>
                              </button>
                              <button
                                type="button"
                                className="pm-action-btn pm-action-edit"
                                onClick={() => setEditingProduct({ ...product })}
                                aria-label={`Edit ${product.name}`}
                              >
                                <svg
                                  className="pm-action-icon"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M11.3 2.5L13.5 4.7L5.6 12.6L2.7 13.3L3.4 10.4L11.3 2.5Z"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                className="pm-action-btn pm-action-delete"
                                onClick={() => setDeleteTarget(product)}
                                aria-label={`Delete ${product.name}`}
                              >
                                <svg
                                  className="pm-action-icon"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M3 4.5H13M6 4.5V3H10V4.5M5 4.5V12.5C5 13 5.4 13.5 6 13.5H10C10.6 13.5 11 13 11 12.5V4.5"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="pm-empty-row">
                        No matching products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Share Product Modal */}
      {shareTarget && shareProductLinks && (
        <div
          className="pm-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pm-share-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeShareModal();
            }
          }}
        >
          <div className="pm-modal pm-share-modal">
            <div className="pm-share-header">
              <div>
                <h2 id="pm-share-modal-title">Share Product</h2>
                <p className="pm-share-product-meta">
                  <span>{shareTarget.name}</span>
                  <span aria-hidden="true">·</span>
                  <span>₱{Number(shareTarget.price).toLocaleString()}</span>
                  <span aria-hidden="true">·</span>
                  <span>{shareTarget.category}</span>
                </p>
              </div>
              <button
                type="button"
                className="pm-modal-close"
                onClick={closeShareModal}
                aria-label="Close Share Product modal"
              >
                ×
              </button>
            </div>

            {/* Section A: Product Links */}
            <div className="pm-share-section">
              <h3 className="pm-share-section-title">Product Links</h3>

              <div className="pm-link-group">
                <label htmlFor="pm-sales-url" className="pm-link-label">
                  Sales Page
                </label>
                <div className="pm-link-row">
                  <input
                    id="pm-sales-url"
                    type="text"
                    readOnly
                    className="pm-link-input"
                    value={shareProductLinks.salesPageUrl}
                    onFocus={(e) => e.target.select()}
                  />
                  <button
                    type="button"
                    className={`pm-copy-btn ${
                      copiedLinkType === 'sales' ? 'is-copied' : ''
                    }`}
                    onClick={() =>
                      handleCopyUrl(shareProductLinks.salesPageUrl, 'sales')
                    }
                  >
                    <svg
                      className="pm-copy-icon"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <rect
                        x="5.5"
                        y="5.5"
                        width="8"
                        height="8"
                        rx="1.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M10.5 3.5H4C3.17 3.5 2.5 4.17 2.5 5V11.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{copiedLinkType === 'sales' ? 'Copied!' : 'Copy link'}</span>
                  </button>
                </div>
                {copiedLinkType === 'sales' && (
                  <p className="pm-copy-confirm" role="status">
                    Sales page link copied to clipboard.
                  </p>
                )}
              </div>

              <div className="pm-link-group">
                <label htmlFor="pm-checkout-url" className="pm-link-label">
                  Checkout Page
                </label>
                <div className="pm-link-row">
                  <input
                    id="pm-checkout-url"
                    type="text"
                    readOnly
                    className="pm-link-input"
                    value={shareProductLinks.checkoutPageUrl}
                    onFocus={(e) => e.target.select()}
                  />
                  <button
                    type="button"
                    className={`pm-copy-btn ${
                      copiedLinkType === 'checkout' ? 'is-copied' : ''
                    }`}
                    onClick={() =>
                      handleCopyUrl(shareProductLinks.checkoutPageUrl, 'checkout')
                    }
                  >
                    <svg
                      className="pm-copy-icon"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <rect
                        x="5.5"
                        y="5.5"
                        width="8"
                        height="8"
                        rx="1.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M10.5 3.5H4C3.17 3.5 2.5 4.17 2.5 5V11.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>
                      {copiedLinkType === 'checkout' ? 'Copied!' : 'Copy link'}
                    </span>
                  </button>
                </div>
                {copiedLinkType === 'checkout' && (
                  <p className="pm-copy-confirm" role="status">
                    Checkout page link copied to clipboard.
                  </p>
                )}
              </div>
            </div>

            {/* Section B: Share on social media */}
            <div className="pm-share-section">
              <h3 className="pm-share-section-title">Share on social media</h3>

              <div className="pm-social-grid">
                <a
                  href={shareProductLinks.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pm-social-option"
                >
                  <span className="pm-social-circle pm-social-whatsapp" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3.5C7.305 3.5 3.5 7.305 3.5 12c0 1.62.455 3.133 1.244 4.42L3.8 20.2l3.91-.915A8.46 8.46 0 0 0 12 20.5c4.695 0 8.5-3.805 8.5-8.5S16.695 3.5 12 3.5Z"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.6 9.1c-.2-.45-.42-.46-.62-.47h-.53c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.65 1.12 2.83.14.18 1.9 3.04 4.68 4.14 2.31.91 2.78.73 3.28.68.5-.05 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.31-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.59-1.46-.83-2Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="pm-social-label">WhatsApp</span>
                </a>

                <a
                  href={shareProductLinks.facebookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pm-social-option"
                >
                  <span className="pm-social-circle pm-social-facebook" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M13.5 20.5V12.8H16.1L16.5 9.8H13.5V7.9C13.5 7.03 13.74 6.44 14.99 6.44H16.6V3.75C16.32 3.71 15.36 3.63 14.25 3.63C11.93 3.63 10.35 5.05 10.35 7.64V9.8H7.75V12.8H10.35V20.5H13.5Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="pm-social-label">Facebook</span>
                </a>

                <a
                  href={shareProductLinks.xHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pm-social-option"
                >
                  <span className="pm-social-circle pm-social-x" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17.55 4.5H20.02L14.62 10.67L20.97 19.06H16L12.1 13.97L7.65 19.06H5.18L10.95 12.46L4.87 4.5H9.97L13.49 9.15L17.55 4.5ZM16.68 17.58H18.05L9.22 5.9H7.75L16.68 17.58Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="pm-social-label">X (Twitter)</span>
                </a>

                <a
                  href={shareProductLinks.emailHref}
                  className="pm-social-option"
                >
                  <span className="pm-social-circle pm-social-email" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect
                        x="4"
                        y="6"
                        width="16"
                        height="12"
                        rx="2"
                        stroke="white"
                        strokeWidth="1.9"
                      />
                      <path
                        d="M4.8 7L12 12.8L19.2 7"
                        stroke="white"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="pm-social-label">E-mail</span>
                </a>
              </div>
            </div>

            {/* Footer Tip Box */}
            <div className="pm-share-tip">
              <span className="pm-share-tip-icon" aria-hidden="true">
                i
              </span>
              <p>
                Click on a platform to share the product link directly or copy the
                link and share it manually.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div
          className="pm-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Edit Product"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEditingProduct(null);
            }
          }}
        >
          <div className="pm-modal">
            <div className="pm-modal-header">
              <h2>Edit Product</h2>
              <button
                type="button"
                className="pm-modal-close"
                onClick={() => setEditingProduct(null)}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <form className="pm-modal-form" onSubmit={handleSaveEdit}>
              <div className="pm-field">
                <label htmlFor="pm-edit-name">Product name</label>
                <input
                  id="pm-edit-name"
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                />
              </div>

              <div className="pm-field">
                <label htmlFor="pm-edit-category">Category</label>
                <select
                  id="pm-edit-category"
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, category: e.target.value })
                  }
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pm-field-row">
                <div className="pm-field">
                  <label htmlFor="pm-edit-price">Price (₱)</label>
                  <input
                    id="pm-edit-price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: e.target.value })
                    }
                  />
                </div>
                <div className="pm-field">
                  <label htmlFor="pm-edit-stock">Stock</label>
                  <input
                    id="pm-edit-stock"
                    type="number"
                    min="0"
                    required
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, stock: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="pm-modal-actions">
                <button
                  type="button"
                  className="pm-btn-cancel"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="pm-btn-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className="pm-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Confirm Delete"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setDeleteTarget(null);
            }
          }}
        >
          <div className="pm-modal pm-modal-sm">
            <h2 className="pm-delete-title">Delete product?</h2>
            <p className="pm-delete-copy">
              Are you sure you want to remove <strong>{deleteTarget.name}</strong> from your store catalog and inventory?
            </p>
            <div className="pm-modal-actions">
              <button
                type="button"
                className="pm-btn-cancel"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="pm-btn-danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}