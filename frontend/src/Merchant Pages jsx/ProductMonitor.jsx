import { useState } from 'react';
import '../Merchant Pages Styling/ProductMonitor.css';
import AdminSidebar from './AdminSidebar.jsx';

const initialProducts = [
  {
    id: 'PRD-001',
    name: 'Everyday Tote Bag',
    store: 'Amara Finds',
    category: 'Fashion',
    price: '₱450',
    status: 'Published',
    reports: 0,
    reportReasons: [],
    description: 'Canvas everyday carry tote bag with reinforced stitching and inner pocket.',
  },
  {
    id: 'PRD-002',
    name: 'Wireless Mini Speaker',
    store: 'Amara Finds',
    category: 'Electronics',
    price: '₱799',
    status: 'Published',
    reports: 0,
    reportReasons: [],
    description: 'Compact Bluetooth 5.3 portable speaker with 8-hour battery playback.',
  },
  {
    id: 'PRD-003',
    name: 'Herbal Skin Set',
    store: 'Kira Studio',
    category: 'Beauty',
    price: '₱1,200',
    status: 'Reported',
    reports: 2,
    reportReasons: ['Missing FDA registration details', 'Unverified ingredient claims'],
    description: '4-piece herbal facial cleanser, toner, serum, and night cream bundle.',
  },
  {
    id: 'PRD-004',
    name: 'Organic Gift Set',
    store: 'Daily Harvest',
    category: 'Home',
    price: '₱650',
    status: 'Published',
    reports: 0,
    reportReasons: [],
    description: 'Eco-friendly soy candle, dried botanicals, and bamboo coaster gift box.',
  },
  {
    id: 'PRD-005',
    name: 'Imported Watch',
    store: 'Urban Goods',
    category: 'Accessories',
    price: '₱3,500',
    status: 'Reported',
    reports: 4,
    reportReasons: ['Suspected counterfeit branding', 'Misleading warranty claim'],
    description: 'Stainless steel analog chronograph watch with leather strap.',
  },
  {
    id: 'PRD-006',
    name: 'Canvas Sneakers',
    store: 'Juno Crafts',
    category: 'Fashion',
    price: '₱1,499',
    status: 'Published',
    reports: 0,
    reportReasons: [],
    description: 'Low-top vulcanized rubber sole canvas sneakers in off-white.',
  },
  {
    id: 'PRD-007',
    name: 'Unverified Supplement',
    store: 'Casa Bloom',
    category: 'Health',
    price: '₱900',
    status: 'Review',
    reports: 3,
    reportReasons: ['Unapproved therapeutic claims', 'No regulatory permit attached'],
    description: 'Daily herbal wellness capsules (60 count bottle).',
  },
];

const ProductMonitor = ({ onNavigate, onLogout }) => {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [showReportedOnly, setShowReportedOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.store.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesReported = showReportedOnly
      ? product.reports > 0 || product.status === 'Reported' || product.status === 'Review'
      : true;

    return matchesSearch && matchesReported;
  });

  const handleProductAction = (productId, action) => {
    if (action === 'Remove') {
      setProducts((prev) => prev.filter((item) => item.id !== productId));
    } else {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === productId
            ? {
                ...item,
                status: action,
                reports: action === 'Published' ? 0 : item.reports,
              }
            : item
        )
      );
    }
    setSelectedProduct(null);
  };

  return (
    <div className="admin-container asidebar-layout">
      <AdminSidebar
        activeTab="products"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="admin-main asidebar-main">
        <header className="admin-top-header asidebar-top-header">
          <div className="admin-role-badge asidebar-role-badge">Administrator</div>
        </header>

        <div className="pmon-page">
      {/* Header */}
      <header className="pmon-header">
        <h1 className="pmon-title">Product Monitoring</h1>
        <p className="pmon-subtitle">
          Monitor products across stores and review reported listings.
        </p>
      </header>

      {/* Search & Filter Bar */}
      <section className="pmon-filter-bar">
        <input
          type="text"
          className="pmon-search-input"
          placeholder="Search products or stores..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="button"
          className={`pmon-filter-btn ${showReportedOnly ? 'active' : ''}`}
          onClick={() => setShowReportedOnly((prev) => !prev)}
        >
          Reported Products
        </button>
      </section>

      {/* Products Table Card */}
      <section className="pmon-table-card">
        <div className="pmon-table-wrapper">
          <table className="pmon-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Store</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Reports</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="pmon-product-name">{product.name}</td>
                    <td className="pmon-store">{product.store}</td>
                    <td className="pmon-category">{product.category}</td>
                    <td className="pmon-price">{product.price}</td>
                    <td>
                      <span
                        className={`pmon-status pmon-status-${product.status.toLowerCase()}`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="pmon-reports">{product.reports}</td>
                    <td>
                      <button
                        type="button"
                        className="pmon-action-btn"
                        onClick={() => setSelectedProduct(product)}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="pmon-empty">
                    No matching products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Admin Notice Banner */}
        <div className="pmon-notice-banner">
          Authorized administrators may remove or deactivate inappropriate products.
        </div>
      </section>

      {/* Product Moderation Modal */}
      {selectedProduct && (
        <div
          className="pmon-modal-backdrop"
          onClick={() => setSelectedProduct(null)}
        >
          <div className="pmon-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pmon-modal-header">
              <div>
                <h2 className="pmon-modal-title">{selectedProduct.name}</h2>
                <p className="pmon-modal-meta">
                  {selectedProduct.store} • {selectedProduct.category} •{' '}
                  {selectedProduct.price}
                </p>
              </div>
              <button
                type="button"
                className="pmon-modal-close"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div className="pmon-modal-body">
              <div className="pmon-detail-block">
                <span className="pmon-detail-label">Listing Description</span>
                <p className="pmon-detail-text">{selectedProduct.description}</p>
              </div>

              <div className="pmon-detail-row">
                <span>Current Status</span>
                <span
                  className={`pmon-status pmon-status-${selectedProduct.status.toLowerCase()}`}
                >
                  {selectedProduct.status}
                </span>
              </div>

              <div className="pmon-detail-row">
                <span>Total Reports</span>
                <strong>{selectedProduct.reports}</strong>
              </div>

              {selectedProduct.reportReasons.length > 0 && (
                <div className="pmon-reasons-box">
                  <span className="pmon-reasons-title">Flagged Reasons</span>
                  <ul>
                    {selectedProduct.reportReasons.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pmon-modal-footer">
              <button
                type="button"
                className="pmon-btn pmon-btn-remove"
                onClick={() => handleProductAction(selectedProduct.id, 'Remove')}
              >
                Remove Listing
              </button>
              <button
                type="button"
                className="pmon-btn pmon-btn-deactivate"
                onClick={() =>
                  handleProductAction(selectedProduct.id, 'Deactivated')
                }
              >
                Deactivate
              </button>
              <button
                type="button"
                className="pmon-btn pmon-btn-approve"
                onClick={() =>
                  handleProductAction(selectedProduct.id, 'Published')
                }
              >
                Approve &amp; Publish
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </main>
    </div>
  );
};

export default ProductMonitor;