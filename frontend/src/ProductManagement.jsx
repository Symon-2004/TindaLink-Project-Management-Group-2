import { useState } from 'react';
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

export default function ProductManagement({
  products: propProducts,
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
  const [portalNotice, setPortalNotice] = useState('');

  const products = propProducts ?? localProducts;

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
              onClick={() => navigateTo('orders', 'New Orders')}
            >
              Payments
            </button>
            <button
              type="button"
              className="pm-nav-item"
              onClick={() =>
                setPortalNotice('Storefront catalog is live and synced with Product Management.')
              }
            >
              Store
            </button>
            <button
              type="button"
              className="pm-nav-item"
              onClick={() =>
                setPortalNotice('Social Media integrations are synced with your active catalog.')
              }
            >
              Social Media
            </button>
            <button
              type="button"
              className="pm-nav-item"
              onClick={() =>
                setPortalNotice('Store settings: Auto-low stock alert threshold set to 5 units.')
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
                          <td className="pm-col-actions">
                            <button
                              type="button"
                              className="pm-action-edit"
                              onClick={() => setEditingProduct({ ...product })}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="pm-action-delete"
                              onClick={() => setDeleteTarget(product)}
                            >
                              Delete
                            </button>
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

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="pm-modal-backdrop" role="dialog" aria-modal="true" aria-label="Edit Product">
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
        <div className="pm-modal-backdrop" role="dialog" aria-modal="true" aria-label="Confirm Delete">
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