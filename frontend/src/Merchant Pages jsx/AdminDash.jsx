import '../Merchant Pages Styling/AdminDash.css';
import AdminSidebar from './AdminSidebar.jsx';

const AdminDash = ({ onLogout, onNavigate }) => {
  return (
    <div className="admin-container asidebar-layout">
      {/* Sidebar */}
      <AdminSidebar
        activeTab="dashboard"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <main className="admin-main asidebar-main">
        {/* Top Header */}
        <header className="admin-top-header asidebar-top-header">
          <div className="admin-role-badge asidebar-role-badge">Administrator</div>
        </header>

        {/* Dashboard Area */}
        <div className="admin-content">
          <div className="admin-title-area">
            <h2>Admin Dashboard</h2>
            <p>System-wide overview of users, merchants, orders, and sales.</p>
          </div>

          {/* Stats Row */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <h3 className="stat-val text-purple">1,248</h3>
              <p className="stat-lbl">Total Customers</p>
            </div>
            <div className="admin-stat-card">
              <h3 className="stat-val text-violet">86</h3>
              <p className="stat-lbl">Total Merchants</p>
            </div>
            <div className="admin-stat-card">
              <h3 className="stat-val text-blue">1,936</h3>
              <p className="stat-lbl">Orders</p>
            </div>
            <div className="admin-stat-card">
              <h3 className="stat-val text-green">₱2.8M</h3>
              <p className="stat-lbl">Total Sales</p>
            </div>
          </div>

          {/* Middle Row */}
          <div className="admin-middle-row">
            <div className="admin-card sales-overview-card">
              <h3>Platform Sales Overview</h3>
              <div className="admin-bar-chart">
                <div className="admin-bar" style={{ height: '32%' }}></div>
                <div className="admin-bar" style={{ height: '52%' }}></div>
                <div className="admin-bar" style={{ height: '72%' }}></div>
                <div className="admin-bar" style={{ height: '55%' }}></div>
                <div className="admin-bar" style={{ height: '86%' }}></div>
                <div className="admin-bar" style={{ height: '66%' }}></div>
                <div className="admin-bar" style={{ height: '100%' }}></div>
                <div className="admin-bar" style={{ height: '78%' }}></div>
                <div className="admin-chart-baseline"></div>
              </div>
            </div>

            <div className="admin-card system-health-card">
              <h3>System Health</h3>
              <div className="health-list">
                <div className="health-item">
                  <span className="health-service">API Services</span>
                  <span className="health-status">Operational</span>
                </div>
                <div className="health-item">
                  <span className="health-service">Database</span>
                  <span className="health-status">Operational</span>
                </div>
                <div className="health-item">
                  <span className="health-service">AI Assistant</span>
                  <span className="health-status">Operational</span>
                </div>
                <div className="health-item">
                  <span className="health-service">Social API</span>
                  <span className="health-status">Operational</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="admin-bottom-row">
            <div className="admin-card">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <p className="activity-item">Merchant approved · 5m</p>
                <p className="activity-item">Product reported · 14m</p>
                <p className="activity-item">Order completed · 21m</p>
                <p className="activity-item">Customer registered · 34m</p>
              </div>
            </div>

            <div className="admin-card">
              <h3>Platform Summary</h3>
              <div className="summary-list">
                <div className="summary-item">
                  <span className="summary-label">Active users</span>
                  <span className="summary-value">1,334</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Pending merchants</span>
                  <span className="summary-value">8</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Reported products</span>
                  <span className="summary-value">3</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Open transactions</span>
                  <span className="summary-value">17</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDash;