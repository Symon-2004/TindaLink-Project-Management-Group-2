import { useRef, useState } from 'react';
import './AddProduct.css';

const CATEGORY_OPTIONS = ['Fashion', 'Electronics', 'Home', 'Beauty', 'Food', 'Accessories'];

export default function AddProduct({
  onSaveProduct,
  onNavigate,
  onSwitchToCustomer,
  onLogout,
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageName, setImageName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [formError, setFormError] = useState('');
  const [savedNotice, setSavedNotice] = useState('');
  const [portalNotice, setPortalNotice] = useState('');

  const fileInputRef = useRef(null);

  const navigateTo = (page, filter) => {
    if (onNavigate) {
      onNavigate(page, filter);
    }
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }
    setFormError('');
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(String(event.target?.result || ''));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Please enter a product name.');
      return;
    }

    const numericPrice = parseFloat(price);
    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      setFormError('Please enter a valid price greater than 0.');
      return;
    }

    const numericStock = Math.max(0, parseInt(stock || '0', 10) || 0);
    const newProduct = {
      id: `p-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || 'Freshly added store listing.',
      price: numericPrice,
      category: category || 'Fashion',
      stock: numericStock,
      lowThreshold: 5,
      image: imagePreview,
    };

    if (onSaveProduct) {
      onSaveProduct(newProduct);
    } else {
      setSavedNotice(`"${newProduct.name}" saved to catalog.`);
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setStock('');
      setImagePreview('');
      setImageName('');
    }
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setStock('');
    setImagePreview('');
    setImageName('');
    setFormError('');
    navigateTo('products');
  };

  const formattedPreviewPrice = (() => {
    const val = parseFloat(price);
    if (Number.isNaN(val)) return '0.00';
    return val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  })();

  const previewStock = Math.max(0, parseInt(stock || '0', 10) || 0);

  return (
    <div className="ap-layout">
      {/* Dark Purple Left Sidebar */}
      <aside className="ap-sidebar" aria-label="Merchant Navigation">
        <div>
          <div className="ap-brand">
            <span className="ap-brand-name">TindaLink</span>
            <span className="ap-brand-role">MERCHANT</span>
          </div>

          <nav className="ap-nav">
            <button
              type="button"
              className="ap-nav-item"
              onClick={() => navigateTo('dashboard')}
            >
              Dashboard
            </button>
            <button
              type="button"
              className="ap-nav-item active"
              onClick={() => navigateTo('products')}
            >
              Products
            </button>
            <button
              type="button"
              className="ap-nav-item"
              onClick={() => navigateTo('inventory')}
            >
              Inventory
            </button>
            <button
              type="button"
              className="ap-nav-item"
              onClick={() => navigateTo('orders')}
            >
              Orders
            </button>
            <button
              type="button"
              className="ap-nav-item"
              onClick={() => navigateTo('orders', 'New Orders')}
            >
              Payments
            </button>
            <button
              type="button"
              className="ap-nav-item"
              onClick={() =>
                setPortalNotice('Storefront catalog is live and synced with Product Management.')
              }
            >
              Store
            </button>
            <button
              type="button"
              className="ap-nav-item"
              onClick={() =>
                setPortalNotice('Social Media integrations are synced with your active catalog.')
              }
            >
              Social Media
            </button>
            <button
              type="button"
              className="ap-nav-item"
              onClick={() =>
                setPortalNotice('Store settings: Auto-low stock alert threshold set to 5 units.')
              }
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="ap-sidebar-footer">TindaLink</div>
      </aside>

      {/* Main Content */}
      <div className="ap-content-shell">
        <header className="ap-topbar">
          <span className="ap-topbar-title">Merchant Portal</span>
          {(onSwitchToCustomer || onLogout) && (
            <div className="ap-topbar-actions">
              {onSwitchToCustomer && (
                <button
                  type="button"
                  className="ap-topbar-btn"
                  onClick={onSwitchToCustomer}
                >
                  Customer View
                </button>
              )}
              {onLogout && (
                <button
                  type="button"
                  className="ap-topbar-btn ap-topbar-btn-outline"
                  onClick={onLogout}
                >
                  Log Out
                </button>
              )}
            </div>
          )}
        </header>

        <main className="ap-main">
          <div className="ap-page-header">
            <h1 className="ap-page-title">Add Product</h1>
            <p className="ap-page-subtitle">
              Create a new product listing with the required product and inventory information.
            </p>
          </div>

          {portalNotice && (
            <div className="ap-notice-banner" role="status">
              <span>{portalNotice}</span>
              <button
                type="button"
                className="ap-notice-close"
                onClick={() => setPortalNotice('')}
                aria-label="Dismiss notice"
              >
                ×
              </button>
            </div>
          )}

          {savedNotice && (
            <div className="ap-notice-banner" role="status">
              <span>{savedNotice}</span>
              <button
                type="button"
                className="ap-notice-close"
                onClick={() => setSavedNotice('')}
                aria-label="Dismiss notice"
              >
                ×
              </button>
            </div>
          )}

          <form className="ap-grid" onSubmit={handleSubmit}>
            {/* Left Card: Product Information */}
            <section className="ap-form-card">
              <h2 className="ap-card-title">Product Information</h2>

              <div className="ap-field">
                <label htmlFor="ap-product-name">Product name</label>
                <input
                  id="ap-product-name"
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="ap-field">
                <label htmlFor="ap-product-desc">Description</label>
                <input
                  id="ap-product-desc"
                  type="text"
                  placeholder="Describe your product"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="ap-field">
                <label htmlFor="ap-product-price">Price</label>
                <div className="ap-price-input-wrap">
                  <span className="ap-currency-prefix">₱</span>
                  <input
                    id="ap-product-price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="ap-field">
                <label htmlFor="ap-product-category">Category</label>
                <select
                  id="ap-product-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={!category ? 'is-placeholder' : ''}
                >
                  <option value="">Select category</option>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ap-field">
                <label htmlFor="ap-product-stock">Stock</label>
                <input
                  id="ap-product-stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>

              <div className="ap-field">
                <label>Product image</label>
                <div
                  className={`ap-dropzone ${isDragging ? 'is-dragging' : ''}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="ap-file-hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(file);
                    }}
                  />

                  <p className="ap-dropzone-text">
                    {imageName ? `Selected: ${imageName}` : 'Drag & drop image here or'}
                  </p>

                  <div className="ap-dropzone-actions">
                    <button
                      type="button"
                      className="ap-upload-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {imagePreview ? 'Change Image' : 'Upload Image'}
                    </button>
                    {imagePreview && (
                      <button
                        type="button"
                        className="ap-remove-img-btn"
                        onClick={() => {
                          setImagePreview('');
                          setImageName('');
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {formError && <p className="ap-form-error">{formError}</p>}
            </section>

            {/* Right Column: Listing Preview & Buttons */}
            <aside className="ap-right-col">
              <div className="ap-preview-card">
                <h2 className="ap-card-title">Listing Preview</h2>
                <div className="ap-preview-img-box">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt={name || 'Product preview'}
                      className="ap-preview-img"
                    />
                  ) : null}
                </div>
                <div className="ap-preview-name">
                  {name.trim() || 'Product name'}
                </div>
                <div className="ap-preview-price">₱ {formattedPreviewPrice}</div>
                <div className="ap-preview-stock">{previewStock} in stock</div>
              </div>

              <div className="ap-actions-row">
                <button type="submit" className="ap-save-btn">
                  Save Product
                </button>
                <button
                  type="button"
                  className="ap-cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </aside>
          </form>
        </main>
      </div>
    </div>
  );
}