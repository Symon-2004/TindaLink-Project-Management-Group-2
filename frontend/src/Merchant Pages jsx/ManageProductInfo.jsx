import { useState } from 'react';
import '../Merchant Pages Styling/ManageProductInfo.css';

const getProductStatus = (stock) => {
    if (stock <= 0) return 'Out of stock';
    if (stock <= 5) return 'Low stock';
    return 'Active';
};

const ManageProductInfo = ({ products, onAddProduct, onDeleteProduct, onNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredProducts = products.filter((product) =>
        `${product.name} ${product.category}`.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const getStatusClass = (status) => {
        switch (status) {
            case 'Active': return 'status-active';
            case 'Low stock': return 'status-low';
            case 'Out of stock': return 'status-out';
            default: return '';
        }
    };

    return (
        <div className="dashboard-container">
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
                    <a href="#" className="nav-item active" aria-current="page">Products</a>
                    <a
                        href="#"
                        className="nav-item"
                        onClick={(event) => {
                            event.preventDefault();
                            onNavigate('inventory');
                        }}
                    >
                        Inventory
                    </a>
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

            <main className="main-content">
                <header className="top-header">
                    <h1>Merchant Portal</h1>
                </header>

                <div className="page-content">
                    <div className="page-title-area">
                        <h2>Product Management</h2>
                        <p>Create, update, and manage products available in your store.</p>
                    </div>

                    <div className="table-actions-bar">
                        <input
                            type="search"
                            className="search-input"
                            placeholder="Search products..."
                            aria-label="Search products"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                        <button className="btn-add-product" onClick={onAddProduct}>
                            + Add Product
                        </button>
                    </div>

                    <div className="table-card">
                        <table className="products-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.length > 0 ? filteredProducts.map((product) => {
                                    const status = getProductStatus(product.stock);

                                    return (
                                        <tr key={product.id}>
                                            <td className="fw-bold">{product.name}</td>
                                            <td className="text-muted">{product.category}</td>
                                            <td className="fw-bold purple-text">
                                                ₱{Number(product.price).toLocaleString('en-PH', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </td>
                                            <td className="fw-bold">{product.stock}</td>
                                            <td>
                                                <span className={`status-pill ${getStatusClass(status)}`}>
                                                    {status}
                                                </span>
                                            </td>
                                            <td className="actions-cell">
                                                <button
                                                    className="btn-action delete"
                                                    onClick={() => onDeleteProduct(product.id)}
                                                    aria-label={`Delete ${product.name}`}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan="6" className="text-muted">
                                            {products.length === 0
                                                ? 'No products yet. Add a product to get started.'
                                                : 'No products match your search.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManageProductInfo;
