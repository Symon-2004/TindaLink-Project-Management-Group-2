import '../Merchant Pages Styling/MerchantManage.css';
import AdminSidebar from './AdminSidebar.jsx';

const MerchantManage = ({ onNavigate, onLogout }) => {
  const merchants = [
    { id: 1, name: 'Amara Finds', store: 'Amara Finds', status: 'Active', joined: 'Sep 2', products: 24 },
    { id: 2, name: 'Casa Bloom', store: 'Casa Bloom', status: 'Pending', joined: 'Sep 1', products: 0 },
    { id: 3, name: 'Juno Crafts', store: 'Juno Crafts', status: 'Active', joined: 'Aug 25', products: 18 },
    { id: 4, name: 'Daily Harvest', store: 'Daily Harvest', status: 'Active', joined: 'Aug 20', products: 32 },
    { id: 5, name: 'Kira Studio', store: 'Kira Studio', status: 'Suspended', joined: 'Aug 16', products: 11 },
    { id: 6, name: 'Urban Goods', store: 'Urban Goods', status: 'Pending', joined: 'Aug 14', products: 0 },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'text-green';
      case 'Pending': return 'text-orange';
      case 'Suspended': return 'text-red';
      default: return '';
    }
  };

  return (
    <div className="admin-container asidebar-layout">
      {/* Sidebar */}
      <AdminSidebar
        activeTab="merchants"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <main className="admin-main asidebar-main">
        {/* Top Header */}
        <header className="admin-top-header asidebar-top-header">
          <div className="admin-role-badge asidebar-role-badge">Administrator</div>
        </header>

        {/* Page Content */}
        <div className="admin-content">
          <div className="admin-title-area">
            <h2>Merchant Management</h2>
            <p>Review, approve, suspend, and manage business owner accounts.</p>
          </div>

          {/* Stats Row */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <h3 className="stat-val text-purple">86</h3>
              <p className="stat-lbl">Total Merchants</p>
            </div>
            <div className="admin-stat-card">
              <h3 className="stat-val text-orange">8</h3>
              <p className="stat-lbl">Pending Approval</p>
            </div>
            <div className="admin-stat-card">
              <h3 className="stat-val text-green">73</h3>
              <p className="stat-lbl">Active</p>
            </div>
            <div className="admin-stat-card">
              <h3 className="stat-val text-red">5</h3>
              <p className="stat-lbl">Suspended</p>
            </div>
          </div>

          {/* Merchants Table */}
          <div className="admin-table-card">
            <table className="admin-merchants-table">
              <thead>
                <tr>
                  <th>Merchant</th>
                  <th>Store</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Products</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {merchants.map((merchant) => (
                  <tr key={merchant.id}>
                    <td className="fw-bold">{merchant.name}</td>
                    <td className="text-muted">{merchant.store}</td>
                    <td>
                      <span className={`fw-bold status-lbl ${getStatusClass(merchant.status)}`}>
                        {merchant.status}
                      </span>
                    </td>
                    <td className="text-muted">{merchant.joined}</td>
                    <td className="fw-bold">{merchant.products}</td>
                    <td className="actions-cell">
                      <button className="btn-admin-action review">Review</button>
                      <button className="btn-admin-action actions">Actions</button>
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

export default MerchantManage;