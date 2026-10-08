import { useState } from 'react';
import './Dashboard.css';

export default function Dashboard({ onLogout }) {
  const [activeNav, setActiveNav] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(2);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Categories from Frame 23
  const categories = [
    { id: 'fashion', name: 'Fashion', subtitle: 'Clothes & accessories', bg: '#f3ecff', color: '#7c3aed' },
    { id: 'beauty', name: 'Beauty', subtitle: 'Care & cosmetics', bg: '#fdf2f8', color: '#ec4899' },
    { id: 'electronics', name: 'Electronics', subtitle: 'Devices & gadgets', bg: '#eff6ff', color: '#3b82f6' },
    { id: 'food', name: 'Food', subtitle: 'Local delicacies', bg: '#fefce8', color: '#eab308' },
    { id: 'home', name: 'Home', subtitle: 'Home essentials', bg: '#ecfdf5', color: '#10b981' }
  ];

  // Featured Products from Frame 23
  const featuredProducts = [
    { id: 1, name: 'Everyday Tote Bag', price: 450, rating: 4.9, bg: '#fce7f3' },
    { id: 2, name: 'Wireless Mini Speaker', price: 799, rating: 4.8, bg: '#ede9fe' },
    { id: 3, name: 'Handmade Soy Candle', price: 299, rating: 4.9, bg: '#fef3c7' },
    { id: 4, name: 'Organic Gift Set', price: 650, rating: 4.7, bg: '#dcfce7' }
  ];

  return (
    <div className="tindalink-dashboard">
      {/* 1. TOP NAVBAR */}
      <header className="tindalink-nav">
        <div className="tindalink-nav-left">
          {/* Logo */}
          <div className="tindalink-logo-lockup" onClick={() => setActiveNav('Home')}>
            <div className="tindalink-logo-icon">
              <svg viewBox="0 0 36 36" fill="none" width="24" height="24">
                <path d="M13.5 13V11.2C13.5 8.88 15.38 7 17.7 7C20.02 7 21.9 8.88 21.9 11.2V13" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                <rect x="8.5" y="12.5" width="16.5" height="15.5" rx="3.5" fill="white" />
                <path d="M13.5 16.5C13.5 18.43 15.07 20 17 20C18.93 20 20.5 18.43 20.5 16.5" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
                <rect x="19.5" y="18.5" width="9.5" height="9.5" rx="2.8" transform="rotate(-12 19.5 18.5)" fill="#F5D0FE" stroke="#7C3AED" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="tindalink-brand-name">
              Tinda<span>Link</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="tindalink-nav-links">
            {['Home', 'Shop', 'Categories', 'About'].map((item) => (
              <button
                key={item}
                type="button"
                className={`tindalink-nav-link ${activeNav === item ? 'active' : ''}`}
                onClick={() => setActiveNav(item)}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="tindalink-nav-right">
          {/* Search Box */}
          <div className="tindalink-search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Cart Icon */}
          <button type="button" className="tindalink-cart-btn" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && <span className="tindalink-cart-badge">{cartCount}</span>}
          </button>

          {/* Account Pill */}
          <div className="tindalink-account-wrapper">
            <button
              type="button"
              className="tindalink-account-pill"
              onClick={() => setShowAccountDropdown((prev) => !prev)}
            >
              <div className="tindalink-avatar">PM</div>
              <span>Account</span>
            </button>

            {showAccountDropdown && (
              <div className="tindalink-account-dropdown">
                <button type="button" onClick={() => alert('Profile')}>My Profile</button>
                <button type="button" onClick={() => alert('Orders')}>My Orders</button>
                <hr />
                <button type="button" className="danger" onClick={onLogout}>Log Out</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main className="tindalink-container">
        {/* HERO BANNER - ALIGNED TO THE LEFT */}
        <section className="tindalink-hero">
          <div className="tindalink-hero-text">
            <h1>
              Shop smarter.<br />Support local.
            </h1>
            <p>
              Discover products from growing businesses and local sellers all in one smart marketplace.
            </p>
            <button type="button" className="tindalink-btn-primary">
              Start Shopping
            </button>
          </div>
        </section>

        {/* 3. SHOP BY CATEGORY - ALIGNED TO THE LEFT */}
        <section className="tindalink-section">
          <div className="tindalink-section-header">
            <div>
              <h2>Shop by Category</h2>
              <p>Explore products from different local businesses.</p>
            </div>
            <button type="button" className="tindalink-view-all">View all →</button>
          </div>

          <div className="tindalink-category-grid">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`tindalink-category-card ${selectedCategory === cat.name ? 'selected' : ''}`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                <div className="tindalink-cat-icon" style={{ backgroundColor: cat.bg, color: cat.color }}>
                  ★
                </div>
                <h3>{cat.name}</h3>
                <p>{cat.subtitle}</p>
              </div>
            ))}

            {/* 6th Card: More to Discover */}
            <div className="tindalink-promo-card">
              <span className="tindalink-promo-label">MORE TO DISCOVER</span>
              <h3>Find your next favorite product.</h3>
            </div>
          </div>
        </section>

        {/* 4. FEATURED PRODUCTS - ALIGNED TO THE LEFT */}
        <section className="tindalink-section">
          <div className="tindalink-section-header">
            <div>
              <h2>Featured Products</h2>
              <p>Popular picks from local sellers.</p>
            </div>
          </div>

          <div className="tindalink-products-grid">
            {featuredProducts.map((prod) => (
              <div key={prod.id} className="tindalink-product-card">
                <div className="tindalink-product-thumb" style={{ backgroundColor: prod.bg }}>
                  <button type="button" className="tindalink-fav-btn" aria-label="Favorite">
                    ♥
                  </button>
                </div>
                <div className="tindalink-product-info">
                  <h3>{prod.name}</h3>
                  <div className="tindalink-product-meta">
                    <span className="tindalink-price">₱ {prod.price}</span>
                    <span className="tindalink-rating">★ {prod.rating}</span>
                  </div>
                  <button
                    type="button"
                    className="tindalink-add-cart-btn"
                    onClick={() => setCartCount((prev) => prev + 1)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}