import { useState } from 'react';
import '../Merchant Pages Styling/AddProductInfo.css';

const AddProductInfo = ({ onBack, onSave, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
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
          <a href="#" className="nav-item active">Products</a>
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

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <h1>Merchant Portal</h1>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <div className="page-title-area">
            <h2>Add Product</h2>
            <p>Create a new product listing with the required product and inventory information.</p>
          </div>

          <div className="product-layout">
            {/* Left Column: Form */}
            <div className="form-column">
              <div className="card">
                <h3 className="card-title">Product Information</h3>
                
                <form id="product-form" className="product-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="product-name">Product name</label>
                    <input
                      id="product-name"
                      name="name"
                      type="text"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={updateField}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="product-description">Description</label>
                    <input
                      id="product-description"
                      name="description"
                      type="text"
                      placeholder="Describe your product"
                      value={formData.description}
                      onChange={updateField}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="product-price">Price</label>
                    <input
                      id="product-price"
                      name="price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="₱ 0.00"
                      value={formData.price}
                      onChange={updateField}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="product-category">Category</label>
                    <select
                      id="product-category"
                      name="category"
                      value={formData.category}
                      onChange={updateField}
                      required
                    >
                      <option value="" disabled>Select category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Home & Living">Home &amp; Living</option>
                      <option value="Beauty">Beauty</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="product-stock">Stock</label>
                    <input
                      id="product-stock"
                      name="stock"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      value={formData.stock}
                      onChange={updateField}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Product image</label>
                    <div className="image-upload-area">
                      <p>Drag & drop image here or</p>
                      <button type="button" className="btn-upload">Upload Image</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Preview & Actions */}
            <div className="preview-column">
              <div className="card preview-card">
                <h3 className="card-title">Listing Preview</h3>
                <div className="preview-image-placeholder"></div>
                <div className="preview-details">
                  <h4>{formData.name || 'Product name'}</h4>
                  <p className="preview-price">
                    ₱ {formData.price ? Number(formData.price).toFixed(2) : '0.00'}
                  </p>
                  <p className="preview-stock">{formData.stock || 0} in stock</p>
                </div>
              </div>

              <div className="action-buttons-row">
                <button className="btn-save" type="submit" form="product-form">
                  Save Product
                </button>
                <button className="btn-cancel" type="button" onClick={onBack}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProductInfo;