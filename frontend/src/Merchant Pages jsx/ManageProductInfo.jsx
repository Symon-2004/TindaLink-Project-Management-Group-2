import { useState } from 'react';
import '../Merchant Pages Styling/ManageProductInfo.css';
import MerchantSidebar from './MerchantSidebar.jsx';

const DEFAULT_PRODUCTS = [
    { id: 1, name: 'Everyday Tote Bag', category: 'Fashion', price: 450, stock: 24 },
    { id: 2, name: 'Wireless Mini Speaker', category: 'Electronics', price: 799, stock: 3 },
    { id: 3, name: 'Handmade Soy Candle', category: 'Home & Living', price: 299, stock: 18 },
    { id: 4, name: 'Organic Gift Set', category: 'Beauty', price: 650, stock: 4 },
    { id: 5, name: 'Canvas Sneakers', category: 'Fashion', price: 1499, stock: 12 },
    { id: 6, name: 'Mini Ring Light', category: 'Electronics', price: 599, stock: 0 },
];

const getProductStatus = (stock) => {
    if (stock <= 0) return 'Out of stock';
    if (stock <= 5) return 'Low stock';
    return 'Active';
};

const ManageProductInfo = ({
    products = DEFAULT_PRODUCTS,
    onAddProduct,
    onDeleteProduct,
    onNavigate,
    onLogout,
}) => {
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
        <div className="dashboard-container msidebar-layout">
            <MerchantSidebar
                activeTab="products"
                onNavigate={onNavigate}
                onLogout={onLogout}
            />

            <main className="main-content msidebar-main">
                <header className="top-header msidebar-top-header">
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
