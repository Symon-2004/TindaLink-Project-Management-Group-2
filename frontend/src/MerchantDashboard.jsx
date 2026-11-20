import { useState } from 'react';
import './MerchantDashboard.css';

const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'Everyday Tote Bag', category: 'Fashion', price: 450, stock: 24, lowThreshold: 5 },
  { id: 'p2', name: 'Wireless Mini Speaker', category: 'Electronics', price: 799, stock: 3, lowThreshold: 5 },
  { id: 'p3', name: 'Handmade Soy Candle', category: 'Home', price: 299, stock: 18, lowThreshold: 5 },
  { id: 'p4', name: 'Organic Gift Set', category: 'Beauty', price: 650, stock: 4, lowThreshold: 5 },
  { id: 'p5', name: 'Canvas Sneakers', category: 'Fashion', price: 1499, stock: 12, lowThreshold: 5 },
  { id: 'p6', name: 'Mini Ring Light', category: 'Electronics', price: 599, stock: 0, lowThreshold: 5 },
];

const DEFAULT_ORDERS = [
  { id: '#00124', customer: 'Peachy Mangaoang', total: 2048, paymentStatus: 'Pending', status: 'Pending verification' },
  { id: '#00119', customer: 'A. Santos', total: 899, paymentStatus: 'Paid', status: 'Processing' },
  { id: '#00108', customer: 'M. Cruz', total: 450, paymentStatus: 'Paid', status: 'Completed' },
  { id: '#00103', customer: 'J. Reyes', total: 650, paymentStatus: 'Paid', status: 'Completed' },
  { id: '#00098', customer: 'L. Garcia', total: 299, paymentStatus: 'Rejected', status: 'Cancelled' },
];

export default function MerchantDashboard({
  products = DEFAULT_PRODUCTS,
  orders = DEFAULT_ORDERS,
  onNavigate,
  onSelectOrder,
  onSwitchToCustomer,
  onLogout,
}) {
  const [portalNotice, setPortalNotice] = useState('');

  const lowStockItems = products.filter((item) => item.stock <= (item.lowThreshold ?? 5));
  const activeOrdersRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + Number(o.total || 0), 0);

  const totalSales = 44603 + activeOrdersRevenue;
  const totalOrdersCount = 81 + orders.length;
  const totalProductsCount = products.length;
  const lowStockCount = lowStockItems.length;

  const recentOrders = orders.slice(0, 4);

  const navigateTo = (page, filter) => {
    setPortalNotice('');
    if (onNavigate) {
      onNavigate(page, filter);
    }
  };

  const getStatusClass = (status) => {
    const normalized = String(status || '').toLowerCase();
    if (normalized.includes('pending')) return 'md-status-pending';
    if (normalized.includes('cancelled')) return 'md-status-cancelled';
    return 'md-status-positive';
  };

  const getStatusDisplay = (status) => {
    if (status === 'Pending verification') return 'Pending Verification';
    return status;
  };

  return (
    <div className="md-layout">
      {/* Dark Purple Left Sidebar */}
      <aside className="md-sidebar" aria-label="Merchant Navigation">
        <div>
          <div className="md-brand">
            <span className="md-brand-name">TindaLink</span>
            <span className="md-brand-role">MERCHANT</span>
          </div>

          <nav className="md-nav">
            <button
              type="button"
              className="md-nav-item active"
              onClick={() => navigateTo('dashboard')}
            >
              Dashboard
            </button>
            <button
              type="button"
              className="md-nav-item"
              onClick={() => navigateTo('products')}
            >
              Products
            </button>
            <button
              type="button"
              className="md-nav-item"
              onClick={() => navigateTo('inventory')}
            >
              Inventory
            </button>
            <button
              type="button"
              className="md-nav-item"
              onClick={() => navigateTo('orders')}
            >
              Orders
            </button>
            <button
              type="button"
              className="md-nav-item"
              onClick={() => navigateTo('payments')}
            >
              Payments
            </button>

            <button
              type="button"
              className="md-nav-item"
              onClick={() =>
                onNavigate
                  ? navigateTo('store')
                  : setPortalNotice('Storefront catalog is live and synced with Merchant Dashboard.')
              }
            >
              Store
            </button>

            <button
              type="button"
              className="md-nav-item"
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

        <div className="md-sidebar-footer">TindaLink</div>
      </aside>

      {/* Main Content Area */}
      <div className="md-content-shell">
        <header className="md-topbar">
          <span className="md-topbar-title">Merchant Portal</span>
          {(onSwitchToCustomer || onLogout) && (
            <div className="md-topbar-actions">
              {onSwitchToCustomer && (
                <button
                  type="button"
                  className="md-topbar-btn"
                  onClick={onSwitchToCustomer}
                >
                  Customer View
                </button>
              )}
              {onLogout && (
                <button
                  type="button"
                  className="md-topbar-btn md-topbar-btn-outline"
                  onClick={onLogout}
                >
                  Log Out
                </button>
              )}
            </div>
          )}
        </header>

        <main className="md-main">
          <div className="md-page-header">
            <h1 className="md-page-title">Merchant Dashboard</h1>
            <p className="md-page-subtitle">
              A quick overview of your store, orders, products, and inventory.
            </p>
          </div>

          {portalNotice && (
            <div className="md-notice-banner" role="status">
              <span>{portalNotice}</span>
              <button
                type="button"
                className="md-notice-close"
                onClick={() => setPortalNotice('')}
                aria-label="Dismiss notice"
              >
                ×
              </button>
            </div>
          )}

          {/* 4 Summary Metric Cards */}
          <section className="md-kpi-grid" aria-label="Store summary">
            <div className="md-kpi-card">
              <div className="md-kpi-value md-kpi-purple">
                ₱{totalSales.toLocaleString()}
              </div>
              <div className="md-kpi-label">Total Sales</div>
            </div>

            <div className="md-kpi-card">
              <div className="md-kpi-value md-kpi-purple">{totalOrdersCount}</div>
              <div className="md-kpi-label">Orders</div>
            </div>

            <div className="md-kpi-card">
              <div className="md-kpi-value md-kpi-purple">{totalProductsCount}</div>
              <div className="md-kpi-label">Products</div>
            </div>

            <div className="md-kpi-card">
              <div className="md-kpi-value md-kpi-amber">{lowStockCount}</div>
              <div className="md-kpi-label">Low Stock</div>
            </div>
          </section>

          {/* Recent Orders */}
          <section className="md-recent-section">
            <div className="md-card">
              <h2 className="md-card-title">Recent Orders</h2>
              <div className="md-recent-list">
                {recentOrders.map((order) => (
                  <button
                    key={order.id}
                    type="button"
                    className="md-recent-item"
                    onClick={() => {
                      if (onSelectOrder) {
                        onSelectOrder(order.id);
                      }
                      navigateTo('orders');
                    }}
                  >
                    <div className="md-recent-top">
                      <span className="md-recent-id">{order.id}</span>
                      <span className="md-recent-amount">
                        ₱{Number(order.total).toLocaleString()}
                      </span>
                    </div>
                    <div className={`md-recent-status ${getStatusClass(order.status)}`}>
                      {getStatusDisplay(order.status)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom Grid: Low Stock Alerts + Quick Actions */}
          <section className="md-bottom-grid">
            {/* Low Stock Alerts */}
            <div className="md-card">
              <h2 className="md-card-title">Low Stock Alerts</h2>
              <div className="md-alerts-list">
                {lowStockItems.length > 0 ? (
                  lowStockItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="md-alert-row"
                      onClick={() => navigateTo('inventory')}
                    >
                      <span className="md-alert-name">{item.name}</span>
                      <span
                        className={`md-alert-qty ${
                          item.stock === 0 ? 'md-qty-zero' : 'md-qty-low'
                        }`}
                      >
                        {item.stock} left
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="md-empty-alerts">All products currently have healthy stock.</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="md-card">
              <h2 className="md-card-title">Quick Actions</h2>
              <div className="md-quick-grid">
                <button
                  type="button"
                  className="md-quick-btn md-quick-primary"
                  onClick={() => navigateTo('add-product')}
                >
                  Add Product
                </button>
                <button
                  type="button"
                  className="md-quick-btn md-quick-secondary"
                  onClick={() => navigateTo('inventory')}
                >
                  Manage Inventory
                </button>
                <button
                  type="button"
                  className="md-quick-btn md-quick-secondary"
                  onClick={() => navigateTo('orders')}
                >
                  View Orders
                </button>
                <button
                  type="button"
                  className="md-quick-btn md-quick-secondary"
                  onClick={() => navigateTo('payments')}
                >
                  Review Payments
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}