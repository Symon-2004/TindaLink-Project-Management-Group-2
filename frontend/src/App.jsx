import { useState } from 'react';
import Login from './Login.jsx';
import CustomerWorkspace from './CustomerWorkspace.jsx';
import MerchantWorkspace from './MerchantWorkspace.jsx';

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    sku: 'TL-1001',
    name: 'Barako Whole Bean Coffee (500g)',
    category: 'Pantry & Beverages',
    price: 340,
    stock: 28,
    unit: 'bag',
    description: 'Single-origin Batangas Liberica roast stocked directly by TindaLink Merchant.',
  },
  {
    id: 'prod-2',
    sku: 'TL-1002',
    name: 'Davao Tablea Pure Cacao Discs',
    category: 'Pantry & Beverages',
    price: 215,
    stock: 42,
    unit: 'pack',
    description: 'Traditional stone-ground 100% fermented cacao discs for hot sikwate.',
  },
  {
    id: 'prod-3',
    sku: 'TL-1003',
    name: 'Benguet Highland Strawberries',
    category: 'Fresh Produce',
    price: 290,
    stock: 9,
    unit: 'punnet',
    description: 'Chilled morning-harvested La Trinidad sweet strawberries (500g punnet).',
  },
  {
    id: 'prod-4',
    sku: 'TL-1004',
    name: 'Artisanal Pandesal & Kesong Puti Pack',
    category: 'Snacks & Bakery',
    price: 185,
    stock: 16,
    unit: 'box',
    description: 'Freshly baked soft pandesal paired with Laguna carabao milk white cheese.',
  },
  {
    id: 'prod-5',
    sku: 'TL-1005',
    name: 'Cold-Pressed Virgin Coconut Oil (500ml)',
    category: 'Home Essentials',
    price: 260,
    stock: 31,
    unit: 'bottle',
    description: 'Unrefined culinary and household grade coconut oil from Quezon province.',
  },
  {
    id: 'prod-6',
    sku: 'TL-1006',
    name: 'Guimaras Sweet Carabao Mangoes (1kg)',
    category: 'Fresh Produce',
    price: 220,
    stock: 8,
    unit: 'kg',
    description: 'Export-grade ripe yellow mangoes hand-picked and packed bruise-free.',
  },
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-2041',
    customerName: 'Peachy Mahaleel',
    customerEmail: 'peachy@email.com',
    itemsSummary: 'Barako Whole Bean Coffee × 1, Davao Tablea × 2',
    totalAmount: 770,
    status: 'Preparing',
    placedAt: 'Today, 09:42 AM',
  },
  {
    id: 'ORD-2040',
    customerName: 'Marco Villanueva',
    customerEmail: 'marco.v@example.com',
    itemsSummary: 'Guimaras Sweet Carabao Mangoes × 2',
    totalAmount: 440,
    status: 'Ready for Pickup',
    placedAt: 'Today, 08:15 AM',
  },
  {
    id: 'ORD-2039',
    customerName: 'Hannah Soriano',
    customerEmail: 'hannah.s@example.com',
    itemsSummary: 'Artisanal Pandesal Pack × 2, Benguet Strawberries × 1',
    totalAmount: 660,
    status: 'Completed',
    placedAt: 'Yesterday, 04:30 PM',
  },
];

const INITIAL_CUSTOMERS = [
  {
    id: 'USR-001',
    name: 'Peachy Mahaleel',
    email: 'peachy@email.com',
    joinedDate: '2026-09-14',
    ordersCount: 4,
    totalSpent: 2490,
  },
  {
    id: 'USR-002',
    name: 'Marco Villanueva',
    email: 'marco.v@example.com',
    joinedDate: '2026-09-19',
    ordersCount: 2,
    totalSpent: 980,
  },
  {
    id: 'USR-003',
    name: 'Hannah Soriano',
    email: 'hannah.s@example.com',
    joinedDate: '2026-09-25',
    ordersCount: 3,
    totalSpent: 1620,
  },
];

const SESSION_STORAGE_KEY = 'tindalink_user_session';

export default function App() {
  const [session, setSession] = useState(() => {
    try {
      const saved = localStorage.getItem(SESSION_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);

  const handleLoginSuccess = (userSession, isNewSignUp = false) => {
    setSession(userSession);
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userSession));
    } catch {
      // Ignore storage quota errors
    }

    if (isNewSignUp && userSession.role === 'customer') {
      const newCustomer = {
        id: `USR-00${customers.length + 1}`,
        name: userSession.name,
        email: userSession.email,
        joinedDate: new Date().toISOString().slice(0, 10),
        ordersCount: 0,
        totalSpent: 0,
      };
      setCustomers((prev) => [newCustomer, ...prev]);
    }
  };

  const handleLogout = () => {
    setSession(null);
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem('tindalink_token');
    } catch {
      // Ignore storage errors
    }
  };

  const handlePlaceOrder = (cartItems) => {
    if (!session) return;
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.qty,
      0
    );
    const summary = cartItems
      .map((i) => `${i.product.name} × ${i.qty}`)
      .join(', ');

    const newOrder = {
      id: `ORD-${2042 + orders.length}`,
      customerName: session.name,
      customerEmail: session.email,
      itemsSummary: summary,
      totalAmount,
      status: 'Pending',
      placedAt: 'Just now',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setProducts((prev) =>
      prev.map((prod) => {
        const bought = cartItems.find((c) => c.product.id === prod.id);
        return bought
          ? { ...prod, stock: Math.max(0, prod.stock - bought.qty) }
          : prod;
      })
    );
  };

  const handleUpdateOrderStatus = (orderId, nextStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  const handleAddProduct = (newProd) => {
    const created = {
      ...newProd,
      id: `prod-${products.length + 1}`,
      sku: `TL-${1001 + products.length}`,
    };
    setProducts((prev) => [created, ...prev]);
  };

  const handleUpdateStock = (productId, delta) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      )
    );
  };

  if (!session) {
    return (
      <Login
        customers={customers}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (session.role === 'merchant') {
    return (
      <MerchantWorkspace
        user={session}
        products={products}
        orders={orders}
        customers={customers}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onAddProduct={handleAddProduct}
        onUpdateStock={handleUpdateStock}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <CustomerWorkspace
      user={session}
      products={products}
      orders={orders}
      onPlaceOrder={handlePlaceOrder}
      onLogout={handleLogout}
    />
  );
}