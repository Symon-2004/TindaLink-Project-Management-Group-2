import { useState } from 'react';
import './InventoryManagement.css';

const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'Everyday Tote Bag', category: 'Fashion', price: 450, stock: 24, lowThreshold: 5 },
  { id: 'p2', name: 'Wireless Mini Speaker', category: 'Electronics', price: 799, stock: 3, lowThreshold: 5 },
  { id: 'p3', name: 'Handmade Soy Candle', category: 'Home', price: 299, stock: 18, lowThreshold: 5 },
  { id: 'p4', name: 'Organic Gift Set', category: 'Beauty', price: 650, stock: 4, lowThreshold: 5 },
  { id: 'p5', name: 'Canvas Sneakers', category: 'Fashion', price: 1499, stock: 12, lowThreshold: 5 },
  { id: 'p6', name: 'Mini Ring Light', category: 'Electronics', price: 599, stock: 0, lowThreshold: 5 },
];

export default function InventoryManagement({
  products: propProducts,
  onAdjustStock,
  onNavigate,
  onSwitchToCustomer,
  onLogout,
}) {
  const [localProducts, setLocalProducts] = useState(DEFAULT_PRODUCTS);
  const [adjustments, setAdjustments] = useState({});
  const [statusFeedback, setStatusFeedback] = useState('');
  const [portalNotice, setPortalNotice] = useState('');

  const products = propProducts ?? localProducts;

  const totalProducts = products.length;
  const totalUnits = products.reduce((sum, item) => sum + Number(item.stock || 0), 0);
  const lowStockCount = products.filter(
    (item) => item.stock > 0 && item.stock <= (item.lowThreshold ?? 5)
  ).length;
  const outOfStockCount = products.filter((item) => item.stock <= 0).length;

  const getAdjustmentValue = (productId) => {
    if (adjustments[productId] === undefined) return -1;
    return adjustments[productId];
  };

  const setAdjustmentValue = (productId, nextVal) => {
    setAdjustments((prev) => ({
      ...prev,
      [productId]: nextVal,
    }));
  };

  const handleApplyAdjustment = (product) => {
    const delta = parseInt(getAdjustmentValue(product.id), 10) || 0;
    if (delta === 0) return;

    const nextStock = Math.max(0, product.stock + delta);

    if (onAdjustStock) {
      onAdjustStock(product.id, delta);
    } else {
      setLocalProducts((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, stock: nextStock } : item
        )
      );
    }

    setStatusFeedback(
      `Updated "${product.name}" stock to ${nextStock} units (${delta > 0 ? `+${delta}` : delta}).`
    );
  };

  const getStockStatus = (stock, threshold = 5) => {
    if (stock <= 0) return { label: 'Out of stock', className: 'im-status-out' };
    if (stock <= threshold) return { label: 'Low stock', className: 'im-status-low' };
    return { label: 'Healthy', className: 'im-status-healthy' };
  };

  const navigateTo = (page, filter) => {
    if (onNavigate) {
      onNavigate(page, filter);
    }
  };

  return (
    <div className="im-layout">
      {/* Dark Purple Left Sidebar */}
      <aside className="im-sidebar" aria-label="Merchant Navigation">
        <div>
          <div className="im-brand">
            <span className="im-brand-name">TindaLink</span>
            <span className="im-brand-role">MERCHANT</span>
          </div>

          <nav className="im-nav">
            <button
              type="button"
              className="im-nav-item"
              onClick={() => navigateTo('dashboard')}
            >
              Dashboard
            </button>
            <button
              type="button"
              className="im-nav-item"
              onClick={() => navigateTo('products')}
            >
              Products
            </button>
            <button
              type="button"
              className="im-nav-item active"
              onClick={() => navigateTo('inventory')}
            >
              Inventory
            </button>
            <button
              type="button"
              className="im-nav-item"
              onClick={() => navigateTo('orders')}
            >
              Orders
            </button>
            <button
              type="button"
              className="im-nav-item"
              onClick={() => navigateTo('orders', 'New Orders')}
            >
              Payments
            </button>
            <button
              type="button"
              className="im-nav-item"
              onClick={() =>
                setPortalNotice('Storefront catalog is live and synced with Inventory Management.')
              }
            >
              Store
            </button>
            <button
              type="button"
              className="im-nav-item"
              onClick={() =>
                setPortalNotice('Social Media integrations are synced with your active catalog.')
              }
            >
              Social Media
            </button>
            <button
              type="button"
              className="im-nav-item"
              onClick={() =>
                setPortalNotice('Store settings: Auto-low stock alert threshold set to 5 units.')
              }
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="im-sidebar-footer">TindaLink</div>
      </aside>

      {/* Main Content */}
      <div className="im-content-shell">
        <header className="im-topbar">
          <span className="im-topbar-title">Merchant Portal</span>
          {(onSwitchToCustomer || onLogout) && (
            <div className="im-topbar-actions">
              {onSwitchToCustomer && (
                <button
                  type="button"
                  className="im-topbar-btn"
                  onClick={onSwitchToCustomer}
                >
                  Customer View
                </button>
              )}
              {onLogout && (
                <button
                  type="button"
                  className="im-topbar-btn im-topbar-btn-outline"
                  onClick={onLogout}
                >
                  Log Out
                </button>
              )}
            </div>
          )}
        </header>

        <main className="im-main">
          <div className="im-page-header">
            <h1 className="im-page-title">Inventory Management</h1>
            <p className="im-page-subtitle">
              Monitor current stock, low-stock products, and stock adjustments.
            </p>
          </div>

          {(portalNotice || statusFeedback) && (
            <div className="im-notice-banner" role="status">
              <span>{statusFeedback || portalNotice}</span>
              <button
                type="button"
                className="im-notice-close"
                onClick={() => {
                  setPortalNotice('');
                  setStatusFeedback('');
                }}
                aria-label="Dismiss notice"
              >
                ×
              </button>
            </div>
          )}

          {/* 4 Summary Metric Cards */}
          <section className="im-kpi-grid" aria-label="Inventory summary">
            <div className="im-kpi-card">
              <div className="im-kpi-value im-kpi-purple">{totalProducts}</div>
              <div className="im-kpi-label">Total Products</div>
            </div>

            <div className="im-kpi-card">
              <div className="im-kpi-value im-kpi-purple">{totalUnits}</div>
              <div className="im-kpi-label">Total Units</div>
            </div>

            <div className="im-kpi-card">
              <div className="im-kpi-value im-kpi-amber">{lowStockCount}</div>
              <div className="im-kpi-label">Low Stock</div>
            </div>

            <div className="im-kpi-card">
              <div className="im-kpi-value im-kpi-red">{outOfStockCount}</div>
              <div className="im-kpi-label">Out of Stock</div>
            </div>
          </section>

          {/* Inventory Table Card */}
          <section className="im-table-card">
            <div className="im-table-wrap">
              <table className="im-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Current Stock</th>
                    <th>Low Threshold</th>
                    <th>Status</th>
                    <th>Adjustment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => {
                      const threshold = product.lowThreshold ?? 5;
                      const stockMeta = getStockStatus(product.stock, threshold);
                      const delta = getAdjustmentValue(product.id);

                      return (
                        <tr key={product.id}>
                          <td className="im-col-name">{product.name}</td>
                          <td className="im-col-stock">{product.stock}</td>
                          <td className="im-col-threshold">{threshold}</td>
                          <td>
                            <span className={`im-status-text ${stockMeta.className}`}>
                              {stockMeta.label}
                            </span>
                          </td>
                          <td>
                            <div className="im-adjust-stepper">
                              <button
                                type="button"
                                className="im-step-btn"
                                onClick={() => setAdjustmentValue(product.id, delta - 1)}
                                aria-label={`Decrease adjustment for ${product.name}`}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                className="im-step-input"
                                value={delta}
                                onChange={(e) =>
                                  setAdjustmentValue(
                                    product.id,
                                    parseInt(e.target.value, 10) || 0
                                  )
                                }
                                aria-label={`Adjustment amount for ${product.name}`}
                              />
                              <button
                                type="button"
                                className="im-step-btn"
                                onClick={() => setAdjustmentValue(product.id, delta + 1)}
                                aria-label={`Increase adjustment for ${product.name}`}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="im-adjust-btn"
                              onClick={() => handleApplyAdjustment(product)}
                            >
                              Adjust
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="im-empty-row">
                        No products in inventory yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}