import { useState } from 'react';
import '../Merchant Pages Styling/MerchantDashboard.css';
import MerchantSidebar from './MerchantSidebar.jsx';
import AddProductInfo from './AddProductInfo.jsx';
import ManageProductInfo from './ManageProductInfo.jsx';
import InventoryManage from './InventoryManage.jsx';
import OrderManage from './OrderManage.jsx';
import OrderDetails from './OrderDetails.jsx';
import PaymentManagement from './PaymentManagement.jsx';
import StoreManagement from './StoreManagement.jsx';
import SMCP from './SMCP.jsx';
import MerchantProfile from './MerchantProfile.jsx';

const MerchantDashboard = ({ user, onLogout, onNavigate }) => {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [products, setProducts] = useState([
        { id: 1, name: 'Everyday Tote Bag', category: 'Fashion', price: 450, stock: 24 },
        { id: 2, name: 'Wireless Mini Speaker', category: 'Electronics', price: 799, stock: 3 },
        { id: 3, name: 'Handmade Soy Candle', category: 'Home & Living', price: 299, stock: 18 },
        { id: 4, name: 'Organic Gift Set', category: 'Beauty', price: 650, stock: 4 },
        { id: 5, name: 'Canvas Sneakers', category: 'Fashion', price: 1499, stock: 12 },
        { id: 6, name: 'Mini Ring Light', category: 'Electronics', price: 599, stock: 0 },
    ]);

    const navigateTo = (page) => {
        if (onNavigate) {
            onNavigate(page);
        } else {
            setCurrentPage(page);
        }
    };

    if (!onNavigate) {
        if (currentPage === 'products') {
            return (
                <ManageProductInfo
                    products={products}
                    onAddProduct={() => setCurrentPage('add-product')}
                    onNavigate={setCurrentPage}
                    onLogout={onLogout}
                    onDeleteProduct={(productId) => {
                        setProducts((currentProducts) =>
                            currentProducts.filter((product) => product.id !== productId),
                        );
                    }}
                />
            );
        }

        if (currentPage === 'add-product') {
            return (
                <AddProductInfo
                    onBack={() => setCurrentPage('products')}
                    onNavigate={setCurrentPage}
                    onLogout={onLogout}
                    onSave={(product) => {
                        setProducts((currentProducts) => [
                            ...currentProducts,
                            { ...product, id: Date.now() },
                        ]);
                        setCurrentPage('products');
                    }}
                />
            );
        }

        if (currentPage === 'inventory') {
            return <InventoryManage onNavigate={setCurrentPage} onLogout={onLogout} />;
        }

        if (currentPage === 'orders') {
            return <OrderManage onNavigate={setCurrentPage} onLogout={onLogout} />;
        }

        if (currentPage === 'order-details') {
            return <OrderDetails onNavigate={setCurrentPage} onLogout={onLogout} />;
        }

        if (currentPage === 'payments') {
            return <PaymentManagement onNavigate={setCurrentPage} onLogout={onLogout} />;
        }

        if (currentPage === 'store') {
            return <StoreManagement onNavigate={setCurrentPage} onLogout={onLogout} />;
        }

        if (currentPage === 'social-media') {
            return <SMCP onNavigate={setCurrentPage} onLogout={onLogout} />;
        }

        if (currentPage === 'settings') {
            return <MerchantProfile user={user} onNavigate={setCurrentPage} onLogout={onLogout} />;
        }
    }

    return (
        <div className="dashboard-container msidebar-layout">
            {/* Sidebar */}
            <MerchantSidebar
                activeTab="dashboard"
                onNavigate={navigateTo}
                onLogout={onLogout}
            />

            {/* Main Content */}
            <main className="main-content msidebar-main">
                {/* Top Header */}
                <header className="top-header msidebar-top-header">
                    <h1>Merchant Portal</h1>
                </header>

                {/* Dashboard Area */}
                <div className="dashboard-content">
                    <div className="dashboard-title-area">
                        <h2>Merchant Dashboard</h2>
                        <p>A quick overview of your store, orders, products, and inventory.</p>
                    </div>

                    {/* Stats Row */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3 className="stat-value purple-text">₱48,650</h3>
                            <p className="stat-label">Total Sales</p>
                        </div>
                        <div className="stat-card">
                            <h3 className="stat-value purple-text">86</h3>
                            <p className="stat-label">Orders</p>
                        </div>
                        <div className="stat-card">
                            <h3 className="stat-value purple-text">42</h3>
                            <p className="stat-label">Products</p>
                        </div>
                        <div className="stat-card">
                            <h3 className="stat-value orange-text">7</h3>
                            <p className="stat-label">Low Stock</p>
                        </div>
                    </div>

                    {/* Middle Row */}
                    <div className="middle-row">
                        <div className="card sales-overview">
                            <h3>Sales Overview</h3>
                            <div className="bar-chart">
                                <div className="bar" style={{ height: '30%' }}></div>
                                <div className="bar" style={{ height: '55%' }}></div>
                                <div className="bar" style={{ height: '45%' }}></div>
                                <div className="bar" style={{ height: '70%' }}></div>
                                <div className="bar" style={{ height: '60%' }}></div>
                                <div className="bar" style={{ height: '85%' }}></div>
                                <div className="bar" style={{ height: '65%' }}></div>
                                <div className="chart-base-line"></div>
                            </div>
                        </div>

                        <div className="card recent-orders">
                            <h3>Recent Orders</h3>
                            <div className="order-list">
                                <div className="order-item">
                                    <div className="order-info">
                                        <span className="order-id">#00124</span>
                                        <span className="order-status warning">Pending Verification</span>
                                    </div>
                                    <span className="order-amount">₱2,048</span>
                                </div>
                                <div className="order-item">
                                    <div className="order-info">
                                        <span className="order-id">#00119</span>
                                        <span className="order-status success">Processing</span>
                                    </div>
                                    <span className="order-amount">₱899</span>
                                </div>
                                <div className="order-item">
                                    <div className="order-info">
                                        <span className="order-id">#00108</span>
                                        <span className="order-status success">Completed</span>
                                    </div>
                                    <span className="order-amount">₱450</span>
                                </div>
                                <div className="order-item">
                                    <div className="order-info">
                                        <span className="order-id">#00103</span>
                                        <span className="order-status success">Completed</span>
                                    </div>
                                    <span className="order-amount">₱650</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="bottom-row">
                        <div className="card low-stock-alerts">
                            <h3>Low Stock Alerts</h3>
                            <div className="alert-list">
                                <div className="alert-item">
                                    <span className="product-name">Wireless Mini Speaker</span>
                                    <span className="stock-count orange-text">3 left</span>
                                </div>
                                <div className="alert-item">
                                    <span className="product-name">Organic Gift Set</span>
                                    <span className="stock-count orange-text">4 left</span>
                                </div>
                                <div className="alert-item">
                                    <span className="product-name">Mini Ring Light</span>
                                    <span className="stock-count danger-text">0 left</span>
                                </div>
                            </div>
                        </div>

                        <div className="card quick-actions">
                            <h3>Quick Actions</h3>
                            <div className="action-buttons">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => navigateTo('products')}
                                >
                                    Manage Products
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => navigateTo('inventory')}
                                >
                                    Manage Inventory
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => navigateTo('orders')}
                                >
                                    View Orders
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => navigateTo('payments')}
                                >
                                    Review Payments
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MerchantDashboard;