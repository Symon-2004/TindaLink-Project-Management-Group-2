import '../Merchant Pages Styling/OrderManage.css';
import MerchantSidebar from './MerchantSidebar.jsx';

const OrderManage = ({ onNavigate, onSelectOrder, onLogout }) => {
  // Mock data based on the design
  const orders = [
    { id: '#00124', customer: 'Peachy Mangaoang', total: '₱2,048', payment: 'Pending', status: 'Pending verification', action: 'View' },
    { id: '#00119', customer: 'A. Santos', total: '₱899', payment: 'Paid', status: 'Processing', action: 'View' },
    { id: '#00108', customer: 'M. Cruz', total: '₱450', payment: 'Paid', status: 'Completed', action: 'View' },
    { id: '#00103', customer: 'J. Reyes', total: '₱650', payment: 'Paid', status: 'Completed', action: 'View' },
    { id: '#00098', customer: 'L. Garcia', total: '₱299', payment: 'Rejected', status: 'Cancelled', action: 'View' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending verification': return 'text-warning';
      case 'Processing': 
      case 'Completed': return 'text-success';
      case 'Cancelled': return 'text-danger';
      default: return '';
    }
  };

  return (
    <div className="dashboard-container msidebar-layout">
      {/* Sidebar */}
      <MerchantSidebar
        activeTab="orders"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <main className="main-content msidebar-main">
        {/* Top Header */}
        <header className="top-header msidebar-top-header">
          <h1>Merchant Portal</h1>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <div className="page-title-area">
            <h2>Order Management</h2>
            <p>Review incoming orders and move them through fulfillment stages.</p>
          </div>

          {/* Tabs Nav */}
          <div className="order-tabs">
            <button className="tab-btn active">New Orders</button>
            <button className="tab-btn">Processing</button>
            <button className="tab-btn">Completed</button>
            <button className="tab-btn">Cancelled</button>
          </div>

          {/* Orders Table */}
          <div className="table-card">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td className="fw-bold">{order.id}</td>
                    <td className="text-muted">{order.customer}</td>
                    <td className="fw-bold purple-text">{order.total}</td>
                    <td className="text-muted">{order.payment}</td>
                    <td>
                      <span className={`fw-bold status-text ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-action view"
                        onClick={() => (onSelectOrder ? onSelectOrder() : onNavigate?.('order-details'))}
                      >
                        {order.action}
                      </button>
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

export default OrderManage;