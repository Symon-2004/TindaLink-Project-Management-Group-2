import '../Merchant Pages Styling/MProductInfo.css';

const MProductInfo = ({ onBack }) => {
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
              onBack();
            }}
          >
            Dashboard
          </a>
          <a href="#" className="nav-item active">Products</a>
          <a href="#" className="nav-item">Inventory</a>
          <a href="#" className="nav-item">Orders</a>
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
                
                <form className="product-form">
                  <div className="form-group">
                    <label>Product name</label>
                    <input type="text" placeholder="Enter product name" />
                  </div>
                  
                  <div className="form-group">
                    <label>Description</label>
                    <input type="text" placeholder="Describe your product" />
                  </div>
                  
                  <div className="form-group">
                    <label>Price</label>
                    <input type="text" placeholder="₱ 0.00" />
                  </div>
                  
                  <div className="form-group">
                    <label>Category</label>
                    <select>
                      <option value="" disabled selected>Select category</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="home">Home & Living</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Stock</label>
                    <input type="number" placeholder="0" />
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
                  <h4>Product name</h4>
                  <p className="preview-price">₱ 0.00</p>
                  <p className="preview-stock">0 in stock</p>
                </div>
              </div>

              <div className="action-buttons-row">
                <button className="btn-save">Save Product</button>
                <button className="btn-cancel" onClick={onBack}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MProductInfo;