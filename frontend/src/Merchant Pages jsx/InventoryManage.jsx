import '../Merchant Pages Styling/InventoryManage.css';

const InventoryManage = ({ onNavigate }) => {
  // Mock data based on the design
  const inventoryItems = [
    { id: 1, name: 'Everyday Tote Bag', stock: 24, threshold: 5, status: 'Healthy', adjustment: '- 1' },
    { id: 2, name: 'Wireless Mini Speaker', stock: 3, threshold: 5, status: 'Low stock', adjustment: '- 1' },
    { id: 3, name: 'Handmade Soy Candle', stock: 18, threshold: 5, status: 'Healthy', adjustment: '- 1' },
    { id: 4, name: 'Organic Gift Set', stock: 4, threshold: 5, status: 'Low stock', adjustment: '- 1' },
    { id: 5, name: 'Mini Ring Light', stock: 0, threshold: 5, status: 'Out of stock', adjustment: '- 1' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Healthy': return 'text-success';
      case 'Low stock': return 'text-warning';
      case 'Out of stock': return 'text-danger';
      default: return '';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>TindaLink AI</h2>
          <span className="subtitle">MERCHANT</span>
        </div>
        
        <nav className="sidebar-nav">
          <a
            href="#"
            className="nav-item"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('dashboard');
            }}
          >
            Dashboard
          </a>
          <a
            href="#"
            className="nav-item"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('products');
            }}
          >
            Products
          </a>
          <a href="#" className="nav-item active" aria-current="page">Inventory</a>
          <a
            href="#"
            className="nav-item"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('orders');
            }}
          >
            Orders
          </a>
          <a href="#" className="nav-item">Payments</a>
          <a href="#" className="nav-item">Store</a>
          <div className="nav-spacer"></div>
          <a href="#" className="nav-item">Social Media</a>
          <a href="#" className="nav-item">Settings</a>
        </nav>

        <div className="sidebar-footer">
          <p>TindaLink AI</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <h1>Merchant Portal</h1>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <div className="page-title-area">
            <h2>Inventory Management</h2>
            <p>Monitor current stock, low-stock products, and stock adjustments.</p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-value purple-text">42</h3>
              <p className="stat-label">Total Products</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value purple-text">356</h3>
              <p className="stat-label">Total Units</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value orange-text">7</h3>
              <p className="stat-label">Low Stock</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value red-text">2</h3>
              <p className="stat-label">Out of Stock</p>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="table-card mt-4">
            <table className="inventory-table">
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
                {inventoryItems.map((item) => (
                  <tr key={item.id}>
                    <td className="fw-bold">{item.name}</td>
                    <td className="fw-bold">{item.stock}</td>
                    <td className="text-muted">{item.threshold}</td>
                    <td>
                      <span className={`fw-bold status-text ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="fw-bold purple-text">{item.adjustment}</td>
                    <td>
                      <button className="btn-action edit">Adjust</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InventoryManage;