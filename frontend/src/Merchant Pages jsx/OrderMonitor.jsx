import { useState } from 'react';
import '../Merchant Pages Styling/OrderMonitor.css';
import AdminSidebar from './AdminSidebar.jsx';

const OrderMonitor = ({ onNavigate, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const transactions = [
    { id: '#00124', customer: 'Peachy Mangaoang', merchant: 'Amara Finds', total: '₱2,048', payment: 'Pending', status: 'Pending', date: 'Sep 9' },
    { id: '#00119', customer: 'A. Santos', merchant: 'Juno Crafts', total: '₱899', payment: 'Paid', status: 'Processing', date: 'Sep 8' },
    { id: '#00118', customer: 'M. Cruz', merchant: 'Daily Harvest', total: '₱650', payment: 'Paid', status: 'Shipped', date: 'Sep 8' },
    { id: '#00115', customer: 'J. Reyes', merchant: 'Amara Finds', total: '₱450', payment: 'Paid', status: 'Completed', date: 'Sep 7' },
    { id: '#00109', customer: 'L. Garcia', merchant: 'Kira Studio', total: '₱1,200', payment: 'Rejected', status: 'Cancelled', date: 'Sep 6' },
    { id: '#00103', customer: 'P. Dela Cruz', merchant: 'Urban Goods', total: '₱3,500', payment: 'Paid', status: 'Completed', date: 'Sep 5' },
  ];

  const getPaymentClass = (payment) => {
    switch (payment) {
      case 'Paid': return 'text-green';
      case 'Pending': return 'text-orange';
      case 'Rejected': return 'text-red';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Processing':
      case 'Shipped':
      case 'Completed': return 'text-green';
      case 'Pending': return 'text-orange';
      case 'Cancelled': return 'text-red';
      default: return '';
    }
  };

  const filteredTransactions = transactions.filter(
    (item) =>
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.merchant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-container asidebar-layout">
      {/* Sidebar */}
      <AdminSidebar
        activeTab="orders"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <main className="admin-main asidebar-main">
        {/* Top Header */}
        <header className="admin-top-header">
          <div className="header-controls">
            <input
              type="text"
              className="system-search-input"
              placeholder="Search system..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="header-square-icon"></div>
            <div className="admin-role-badge">Administrator</div>
          </div>
        </header>

        {/* Page Content */}
        <div className="admin-content">
          <div className="admin-title-area">
            <h2>Order Monitoring</h2>
            <p>View system-wide transactions and monitor order and payment status.</p>
          </div>

          {/* Stats Row */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <h3 className="stat-val text-purple">1,936</h3>
              <p className="stat-lbl">Total Orders</p>
            </div>
            <div className="admin-stat-card">
              <h3 className="stat-val text-green">1,742</h3>
              <p className="stat-lbl">Paid</p>
            </div>
            <div className="admin-stat-card">
              <h3 className="stat-val text-orange">126</h3>
              <p className="stat-lbl">Pending</p>
            </div>
            <div className="admin-stat-card">
              <h3 className="stat-val text-red">68</h3>
              <p className="stat-lbl">Cancelled</p>
            </div>
          </div>

          {/* System-wide Transactions Table Card */}
          <div className="admin-table-card">
            <h3 className="table-section-title">System-wide Transactions</h3>

            <table className="admin-transactions-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Merchant</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="fw-bold">{tx.id}</td>
                    <td className="text-muted">{tx.customer}</td>
                    <td className="text-muted">{tx.merchant}</td>
                    <td className="fw-bold text-purple">{tx.total}</td>
                    <td>
                      <span className={`fw-bold ${getPaymentClass(tx.payment)}`}>
                        {tx.payment}
                      </span>
                    </td>
                    <td>
                      <span className={`fw-bold ${getStatusClass(tx.status)}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="text-muted">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="table-footer-actions">
              <button type="button" className="btn-export">Export</button>
              <button type="button" className="btn-view">View</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderMonitor;

