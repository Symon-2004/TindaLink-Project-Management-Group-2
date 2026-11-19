import { useState } from 'react';
import '../Customer Pages Styling/Dashboard.css';
import CustomerNavbar from './CustomerNavbar.jsx';

export default function Dashboard({
  user,
  onLogout,
  onNavigateHome,
  onNavigateShop,
  onNavigateCart,
  onNavigateProfile,
  onNavigateOrders,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(2);
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
      <CustomerNavbar
        activePage="Home"
        user={user}
        showSearch={true}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        onNavigateHome={onNavigateHome}
        onNavigateShop={onNavigateShop}
        onNavigateCart={onNavigateCart}
        onNavigateProfile={onNavigateProfile}
        onNavigateOrders={onNavigateOrders}
        onLogout={onLogout}
      />

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
            <button
              type="button"
              className="tindalink-btn-primary"
              onClick={() => {
                if (onNavigateShop) onNavigateShop();
              }}
            >
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
            <button
              type="button"
              className="tindalink-view-all"
              onClick={() => {
                if (onNavigateShop) onNavigateShop();
              }}
            >
              View all →
            </button>
          </div>

          <div className="tindalink-category-grid">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`tindalink-category-card ${selectedCategory === cat.name ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  if (onNavigateShop) onNavigateShop(cat.name);
                }}
              >
                <div className="tindalink-cat-icon" style={{ backgroundColor: cat.bg, color: cat.color }}>
                  ★
                </div>
                <h3>{cat.name}</h3>
                <p>{cat.subtitle}</p>
              </div>
            ))}

            {/* 6th Card: More to Discover */}
            <div
              className="tindalink-promo-card"
              onClick={() => {
                if (onNavigateShop) onNavigateShop();
              }}
              style={{ cursor: 'pointer' }}
            >
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
                <div
                  className="tindalink-product-thumb"
                  style={{ backgroundColor: prod.bg, cursor: 'pointer' }}
                  onClick={() => {
                    if (onNavigateShop) onNavigateShop();
                  }}
                >
                  <button
                    type="button"
                    className="tindalink-fav-btn"
                    aria-label="Favorite"
                    onClick={(e) => e.stopPropagation()}
                  >
                    ♥
                  </button>
                </div>
                <div className="tindalink-product-info">
                  <h3
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (onNavigateShop) onNavigateShop();
                    }}
                  >
                    {prod.name}
                  </h3>
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
