import { useState } from 'react';
import '../Merchant Pages Styling/OrderManage.css';
import MerchantSidebar from './MerchantSidebar.jsx';

const DEFAULT_ORDERS = [
  {
    id: '#00124',
    customer: 'Peachy Mangaoang',
    email: 'peachy@email.com',
    contact: '0917 458 2910',
    address: 'Blk 2, Lot 10, Example Street, Makati City, Metro Manila',
    paymentMethod: 'GCash',
    referenceNo: 'GC-9084122391',
    items: [
      { name: 'Everyday Tote Bag', qty: 1, price: 450 },
      { name: 'Wireless Mini Speaker', qty: 2, price: 799 },
    ],
    total: 2048,
    paymentStatus: 'Pending',
    status: 'Pending verification',
    placedAt: 'Sep 9, 2026 · 10:15 AM',
  },
  {
    id: '#00119',
    customer: 'A. Santos',
    email: 'a.santos@email.com',
    contact: '0918 224 9102',
    address: '14 Mabini Ave, Quezon City, Metro Manila',
    paymentMethod: 'GCash',
    referenceNo: 'GC-7710293841',
    items: [
      { name: 'Daily Care Gift Box', qty: 1, price: 899 },
    ],
    total: 899,
    paymentStatus: 'Paid',
    status: 'Processing',
    placedAt: 'Sep 8, 2026 · 03:40 PM',
  },
  {
    id: '#00108',
    customer: 'M. Cruz',
    email: 'm.cruz@email.com',
    contact: '0920 882 3190',
    address: '88 Bonifacio High St, Taguig City, Metro Manila',
    paymentMethod: 'Cash on Delivery',
    referenceNo: 'COD-00108',
    items: [
      { name: 'Everyday Tote Bag', qty: 1, price: 450 },
    ],
    total: 450,
    paymentStatus: 'Paid',
    status: 'Completed',
    placedAt: 'Sep 5, 2026 · 11:20 AM',
  },
  {
    id: '#00103',
    customer: 'J. Reyes',
    email: 'j.reyes@email.com',
    contact: '0915 701 4412',
    address: '210 Rizal Blvd, Santa Rosa, Laguna',
    paymentMethod: 'GCash',
    referenceNo: 'GC-6654192031',
    items: [
      { name: 'Organic Gift Set', qty: 1, price: 650 },
    ],
    total: 650,
    paymentStatus: 'Paid',
    status: 'Completed',
    placedAt: 'Sep 2, 2026 · 01:05 PM',
  },
  {
    id: '#00098',
    customer: 'L. Garcia',
    email: 'l.garcia@email.com',
    contact: '0998 331 5904',
    address: '52 Session Rd, Baguio City, Benguet',
    paymentMethod: 'GCash',
    referenceNo: 'GC-INVALID-098',
    items: [
      { name: 'Handmade Soy Candle', qty: 1, price: 299 },
    ],
    total: 299,
    paymentStatus: 'Rejected',
    status: 'Cancelled',
    placedAt: 'Aug 29, 2026 · 06:45 PM',
  },
];

const ORDER_FILTERS = [
  'All Orders',
  'New Orders',
  'Processing',
  'Completed',
  'Cancelled',
];

export default function OrderManage({
  orders: propOrders,
  initialFilter = 'All Orders',
  initialSelectedOrderId = '',
  onUpdateOrderStatus,
  onNavigate,
  onSwitchToCustomer,
  onLogout,
}) {
  const [localOrders, setLocalOrders] = useState(DEFAULT_ORDERS);
  const [activeFilter, setActiveFilter] = useState(initialFilter || 'All Orders');
  const [selectedOrderId, setSelectedOrderId] = useState(initialSelectedOrderId || '');
  const [prevInitialFilter, setPrevInitialFilter] = useState(initialFilter);
  const [prevInitialSelectedOrderId, setPrevInitialSelectedOrderId] = useState(initialSelectedOrderId);

  if (initialFilter !== prevInitialFilter) {
    setPrevInitialFilter(initialFilter);
    if (initialFilter) {
      setActiveFilter(initialFilter);
    }
  }

  if (initialSelectedOrderId !== prevInitialSelectedOrderId) {
    setPrevInitialSelectedOrderId(initialSelectedOrderId);
    if (initialSelectedOrderId) {
      setSelectedOrderId(initialSelectedOrderId);
    }
  }

  const orders = propOrders ?? localOrders;

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === 'All Orders') return true;
    if (activeFilter === 'New Orders') {
      return order.status === 'Pending verification' || order.status === 'Pending';
    }
    return order.status.toLowerCase() === activeFilter.toLowerCase();
  });

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || null;

  const getStatusClass = (status) => {
    const val = String(status || '').toLowerCase();
    if (val.includes('pending')) return 'om-status-pending';
    if (val.includes('processing')) return 'om-status-processing';
    if (val.includes('completed')) return 'om-status-completed';
    if (val.includes('cancelled')) return 'om-status-cancelled';
    return 'om-status-pending';
  };

  const handleStatusChange = (orderId, nextStatus, nextPaymentStatus) => {
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(orderId, nextStatus, nextPaymentStatus);
    } else {
      setLocalOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: nextStatus,
                paymentStatus: nextPaymentStatus ?? order.paymentStatus,
              }
            : order
        )
      );
    }
  };

  const navigateTo = (page, filter) => {
    setSelectedOrderId('');
    if (page === 'orders' && !selectedOrderId) {
      setActiveFilter('All Orders');
    }
    if (onNavigate) {
      onNavigate(page, filter);
    }
  };

  return (
    <div className="om-layout msidebar-layout">
      <MerchantSidebar
        activeTab="orders"
        onNavigate={navigateTo}
        onLogout={onLogout}
      />

      {/* Main Workspace */}
      <div className="om-content-shell msidebar-main">
        <header className="om-topbar msidebar-top-header">
          <span className="om-topbar-title">Merchant Portal</span>
          {(onSwitchToCustomer || onLogout) && (
            <div className="om-topbar-actions">
              {onSwitchToCustomer && (
                <button
                  type="button"
                  className="om-topbar-btn"
                  onClick={onSwitchToCustomer}
                >
                  Customer View
                </button>
              )}
            </div>
          )}
        </header>

        <main className="om-main">
          {!selectedOrder ? (
            <>
              <div className="om-page-header">
                <h1 className="om-page-title">Order Management</h1>
                <p className="om-page-subtitle">
                  Review incoming orders and move them through fulfillment stages.
                </p>
              </div>

              {/* Order Status Filters */}
              <div className="om-filters-row" role="tablist" aria-label="Order Status Filters">
                {ORDER_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={activeFilter === filter}
                    className={`om-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Order Table Card */}
              <section className="om-table-card">
                <div className="om-table-wrap">
                  <table className="om-table">
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
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="om-col-order">{order.id}</td>
                            <td className="om-col-customer">{order.customer}</td>
                            <td className="om-col-total">
                              ₱{Number(order.total).toLocaleString()}
                            </td>
                            <td className="om-col-payment">{order.paymentStatus}</td>
                            <td>
                              <span className={`om-status-text ${getStatusClass(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="om-view-btn"
                                onClick={() => setSelectedOrderId(order.id)}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="om-empty-row">
                            No orders found in {activeFilter}.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          ) : (
            /* Order Details View */
            <section className="om-details-view" aria-label={`Order details for ${selectedOrder.id}`}>
              <div className="om-details-top">
                <div>
                  <button
                    type="button"
                    className="om-back-btn"
                    onClick={() => setSelectedOrderId('')}
                  >
                    ← Back to Orders
                  </button>
                  <h1 className="om-page-title">Order {selectedOrder.id}</h1>
                  <p className="om-page-subtitle">
                    Placed {selectedOrder.placedAt || 'Recently'} ·{' '}
                    <span className={`om-status-text ${getStatusClass(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </p>
                </div>

                <div className="om-details-status-actions">
                  {selectedOrder.status === 'Pending verification' && (
                    <button
                      type="button"
                      className="om-primary-btn"
                      onClick={() =>
                        handleStatusChange(selectedOrder.id, 'Processing', 'Paid')
                      }
                    >
                      Verify Payment &amp; Process
                    </button>
                  )}
                  {selectedOrder.status === 'Processing' && (
                    <button
                      type="button"
                      className="om-primary-btn"
                      onClick={() =>
                        handleStatusChange(selectedOrder.id, 'Completed', 'Paid')
                      }
                    >
                      Mark Completed
                    </button>
                  )}
                  {selectedOrder.status !== 'Cancelled' &&
                    selectedOrder.status !== 'Completed' && (
                      <button
                        type="button"
                        className="om-danger-outline-btn"
                        onClick={() =>
                          handleStatusChange(selectedOrder.id, 'Cancelled', 'Rejected')
                        }
                      >
                        Cancel Order
                      </button>
                    )}
                </div>
              </div>

              <div className="om-details-grid">
                <div className="om-detail-card">
                  <h2 className="om-detail-title">Customer &amp; Delivery</h2>
                  <div className="om-detail-rows">
                    <div className="om-detail-row">
                      <span>Customer</span>
                      <strong>{selectedOrder.customer}</strong>
                    </div>
                    <div className="om-detail-row">
                      <span>Email</span>
                      <strong>{selectedOrder.email || 'customer@email.com'}</strong>
                    </div>
                    <div className="om-detail-row">
                      <span>Contact</span>
                      <strong>{selectedOrder.contact || '0917 000 0000'}</strong>
                    </div>
                    <div className="om-detail-row">
                      <span>Delivery Address</span>
                      <strong>{selectedOrder.address || 'Metro Manila'}</strong>
                    </div>
                  </div>
                </div>

                <div className="om-detail-card">
                  <h2 className="om-detail-title">Payment &amp; Fulfillment</h2>
                  <div className="om-detail-rows">
                    <div className="om-detail-row">
                      <span>Payment Method</span>
                      <strong>{selectedOrder.paymentMethod || 'GCash'}</strong>
                    </div>
                    <div className="om-detail-row">
                      <span>Reference No.</span>
                      <strong>{selectedOrder.referenceNo || 'TL-REF-001'}</strong>
                    </div>
                    <div className="om-detail-row">
                      <span>Payment Status</span>
                      <strong>{selectedOrder.paymentStatus}</strong>
                    </div>
                    <div className="om-detail-row">
                      <span>Order Status</span>
                      <select
                        aria-label="Update order status"
                        className="om-status-select"
                        value={selectedOrder.status}
                        onChange={(e) => {
                          const next = e.target.value;
                          const nextPay =
                            next === 'Cancelled'
                              ? 'Rejected'
                              : next === 'Pending verification'
                              ? 'Pending'
                              : 'Paid';
                          handleStatusChange(selectedOrder.id, next, nextPay);
                        }}
                      >
                        <option value="Pending verification">Pending verification</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="om-detail-card om-items-card">
                <h2 className="om-detail-title">Ordered Items</h2>
                <div className="om-items-list">
                  {(selectedOrder.items || []).map((item, idx) => (
                    <div key={`${item.name}-${idx}`} className="om-item-line">
                      <div>
                        <span className="om-item-name">{item.name}</span>
                        <span className="om-item-qty"> × {item.qty}</span>
                      </div>
                      <span className="om-item-price">
                        ₱{(Number(item.price) * Number(item.qty)).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="om-items-total">
                  <span>Total Amount</span>
                  <strong>₱{Number(selectedOrder.total).toLocaleString()}</strong>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}