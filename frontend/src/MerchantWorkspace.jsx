import { useState } from 'react';
import MerchantDashboard from './MerchantDashboard.jsx';
import ProductManagement from './ProductManagement.jsx';
import AddProduct from './AddProduct.jsx';
import InventoryManagement from './InventoryManagement.jsx';
import OrderManagement from './OrderManagement.jsx';
import OrderDetails from './OrderDetails.jsx';
import PaymentManagement from './PaymentManagement.jsx';
import StoreManagement from './StoreManagement.jsx';
import MerchantSettings from './MerchantSettings.jsx';

const INITIAL_MERCHANT_PRODUCTS = [
  { id: 'p1', name: 'Everyday Tote Bag', category: 'Fashion', price: 450, stock: 24, lowThreshold: 5, description: 'Durable canvas tote bag for daily errands.' },
  { id: 'p2', name: 'Wireless Mini Speaker', category: 'Electronics', price: 799, stock: 3, lowThreshold: 5, description: 'Compact Bluetooth speaker with rich bass.' },
  { id: 'p3', name: 'Handmade Soy Candle', category: 'Home', price: 299, stock: 18, lowThreshold: 5, description: 'Natural vanilla and lavender hand-poured candle.' },
  { id: 'p4', name: 'Organic Gift Set', category: 'Beauty', price: 650, stock: 4, lowThreshold: 5, description: 'Curated herbal skincare bundle.' },
  { id: 'p5', name: 'Canvas Sneakers', category: 'Fashion', price: 1499, stock: 12, lowThreshold: 5, description: 'Breathable everyday low-top sneakers.' },
  { id: 'p6', name: 'Mini Ring Light', category: 'Electronics', price: 599, stock: 0, lowThreshold: 5, description: 'Clip-on LED ring light for video calls.' },
];

const INITIAL_MERCHANT_ORDERS = [
  {
    id: '#00124',
    customer: 'Peachy Mangaoang',
    email: 'peachy@email.com',
    contact: '09xx xxx xxxx',
    address: 'Makati City, Metro Manila',
    paymentMethod: 'GCash',
    referenceNo: '123456789',
    items: [
      { name: 'Everyday Tote Bag', qty: 1, price: 450 },
      { name: 'Wireless Mini Speaker', qty: 2, price: 799 },
    ],
    total: 2048,
    paymentStatus: 'Pending',
    status: 'Pending verification',
    placedAt: 'Sep 9, 2026',
  },
  {
    id: '#00119',
    customer: 'A. Santos',
    email: 'a.santos@email.com',
    contact: '0918 224 9102',
    address: '14 Mabini Ave, Quezon City, Metro Manila',
    paymentMethod: 'GCash',
    referenceNo: 'GC-7710293841',
    items: [{ name: 'Daily Care Gift Box', qty: 1, price: 899 }],
    total: 899,
    paymentStatus: 'Paid',
    status: 'Processing',
    placedAt: 'Sep 8, 2026',
  },
  {
    id: '#00108',
    customer: 'M. Cruz',
    email: 'm.cruz@email.com',
    contact: '0920 882 3190',
    address: '88 Bonifacio High St, Taguig City, Metro Manila',
    paymentMethod: 'Cash on Delivery',
    referenceNo: 'COD-00108',
    items: [{ name: 'Everyday Tote Bag', qty: 1, price: 450 }],
    total: 450,
    paymentStatus: 'Paid',
    status: 'Completed',
    placedAt: 'Sep 5, 2026',
  },
  {
    id: '#00103',
    customer: 'J. Reyes',
    email: 'j.reyes@email.com',
    contact: '0915 701 4412',
    address: '210 Rizal Blvd, Santa Rosa, Laguna',
    paymentMethod: 'GCash',
    referenceNo: 'GC-6654192031',
    items: [{ name: 'Organic Gift Set', qty: 1, price: 650 }],
    total: 650,
    paymentStatus: 'Paid',
    status: 'Completed',
    placedAt: 'Sep 2, 2026',
  },
];

const INITIAL_MERCHANT_PAYMENTS = [
  { id: 'pay-1', orderId: '#00124', customer: 'Peachy Mangaoang', method: 'GCash', reference: '123456789', amount: 2048, status: 'Pending' },
  { id: 'pay-2', orderId: '#00118', customer: 'A. Santos', method: 'GCash', reference: 'GC77124', amount: 899, status: 'Pending' },
  { id: 'pay-3', orderId: '#00115', customer: 'M. Cruz', method: 'GCash', reference: 'GC77124', amount: 450, status: 'Approved' },
  { id: 'pay-4', orderId: '#00109', customer: 'J. Reyes', method: 'GCash', reference: 'GC77124', amount: 650, status: 'Approved' },
  { id: 'pay-5', orderId: '#00103', customer: 'L. Garcia', method: 'GCash', reference: 'GC1123', amount: 299, status: 'Rejected' },
];

export default function MerchantWorkspace({ user, onLogout }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [ordersFilter, setOrdersFilter] = useState('All Orders');
  const [selectedOrderId, setSelectedOrderId] = useState('');

  const [merchantProducts, setMerchantProducts] = useState(INITIAL_MERCHANT_PRODUCTS);
  const [merchantOrders, setMerchantOrders] = useState(INITIAL_MERCHANT_ORDERS);
  const [merchantPayments, setMerchantPayments] = useState(INITIAL_MERCHANT_PAYMENTS);
  const [storeInfo, setStoreInfo] = useState({
    name: 'TindaLink',
    description: 'Local lifestyle & handmade goods',
    contact: '09xx xxx xxxx · tindalink@email.com',
    policies: 'Returns accepted within 7 days for eligible items.',
  });
  const [merchantAccount, setMerchantAccount] = useState({
    fullName: user?.name || 'Peachy Mangaoang',
    email: user?.email || 'merchant@tindalink.ph',
    contactNumber: '09xx xxx xxxx',
    username: '@Tindalink',
    gcashNumber: '09xx xxx xxxx',
    codEnabled: true,
    lowStockThreshold: 5,
  });

  const handleNavigate = (page, filter) => {
    setActivePage(page);
    if (page === 'orders') {
      setOrdersFilter(filter || 'All Orders');
      if (filter) setSelectedOrderId('');
    } else if (page !== 'order-details') {
      setSelectedOrderId('');
    }
  };

  const handleSaveNewProduct = (newProd) => {
    setMerchantProducts((prev) => [newProd, ...prev]);
    setActivePage('products');
  };

  const handleUpdateProduct = (updated) => {
    setMerchantProducts((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const handleDeleteProduct = (productId) => {
    setMerchantProducts((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleAdjustStock = (productId, delta) => {
    setMerchantProducts((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, stock: Math.max(0, item.stock + delta) } : item
      )
    );
  };

  const handleUpdateOrderStatus = (orderId, nextStatus, nextPaymentStatus) => {
    const normalizedStatus = nextStatus === 'Pending Verification' ? 'Pending verification' : nextStatus;
    const resolvedPaymentStatus =
      nextPaymentStatus ??
      (normalizedStatus === 'Cancelled' ? 'Rejected' : normalizedStatus === 'Pending verification' ? 'Pending' : 'Paid');

    setMerchantOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: normalizedStatus, paymentStatus: resolvedPaymentStatus }
          : order
      )
    );

    const paymentRowStatus =
      resolvedPaymentStatus === 'Rejected' ? 'Rejected' : resolvedPaymentStatus === 'Pending' ? 'Pending' : 'Approved';

    setMerchantPayments((prev) =>
      prev.map((payment) => (payment.orderId === orderId ? { ...payment, status: paymentRowStatus } : payment))
    );
  };

  const handleUpdatePaymentStatus = (orderId, nextStatus) => {
    setMerchantPayments((prev) =>
      prev.map((payment) => (payment.orderId === orderId ? { ...payment, status: nextStatus } : payment))
    );
    if (nextStatus === 'Approved') handleUpdateOrderStatus(orderId, 'Paid', 'Paid');
    else if (nextStatus === 'Rejected') handleUpdateOrderStatus(orderId, 'Cancelled', 'Rejected');
    else handleUpdateOrderStatus(orderId, 'Pending verification', 'Pending');
  };

  const handleOpenOrderDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setActivePage('order-details');
  };

  const resolveOrderForDetails = () => {
    const matched = merchantOrders.find((o) => o.id === selectedOrderId) || merchantOrders[0];
    return {
      ...matched,
      status: matched.status === 'Pending verification' ? 'Pending Verification' : matched.status,
    };
  };

  if (activePage === 'products') {
    return (
      <ProductManagement
        products={merchantProducts}
        storeName={storeInfo.name}
        onNavigate={handleNavigate}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onLogout={onLogout}
      />
    );
  }

  if (activePage === 'add-product') {
    return (
      <AddProduct
        onSaveProduct={handleSaveNewProduct}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />
    );
  }

  if (activePage === 'inventory') {
    return (
      <InventoryManagement
        products={merchantProducts}
        onAdjustStock={handleAdjustStock}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />
    );
  }

  if (activePage === 'orders') {
    return (
      <OrderManagement
        orders={merchantOrders}
        initialFilter={ordersFilter}
        initialSelectedOrderId={selectedOrderId}
        onViewOrder={handleOpenOrderDetails}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />
    );
  }

  if (activePage === 'order-details') {
    return (
      <OrderDetails
        order={resolveOrderForDetails()}
        onApprovePayment={(id) => handleUpdateOrderStatus(id, 'Paid', 'Paid')}
        onRejectPayment={(id) => handleUpdateOrderStatus(id, 'Cancelled', 'Rejected')}
        onUpdateStatus={(id, nextStatus) => handleUpdateOrderStatus(id, nextStatus)}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />
    );
  }

  if (activePage === 'payments') {
    return (
      <PaymentManagement
        payments={merchantPayments}
        onUpdatePaymentStatus={handleUpdatePaymentStatus}
        onViewOrder={handleOpenOrderDetails}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />
    );
  }

  if (activePage === 'store') {
    return (
      <StoreManagement
        storeInfo={storeInfo}
        onSaveStore={(updated) => setStoreInfo(updated)}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />
    );
  }

  if (activePage === 'settings') {
    return (
      <MerchantSettings
        userEmail={merchantAccount.email}
        userName={merchantAccount.fullName}
        storeName={storeInfo.name}
        onSaveAccount={(updated) => setMerchantAccount(updated)}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />
    );
  }

  return (
    <MerchantDashboard
      products={merchantProducts}
      orders={merchantOrders}
      onNavigate={handleNavigate}
      onSelectOrder={(orderId) => setSelectedOrderId(orderId)}
      onLogout={onLogout}
    />
  );
}