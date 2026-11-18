import { useState } from 'react';
import '../Customer Pages Styling/Shop.css';

const INITIAL_SHOP_PRODUCTS = [
  {
    id: 1,
    name: 'Everyday Tote Bag',
    category: 'Fashion',
    price: 450,
    rating: 4.9,
    isBestSeller: true,
    inStock: true,
    bgTone: '#FDECEF',
    svgGraphic: (
      <svg viewBox="0 0 160 100" fill="none" className="shop-product-art">
        <path
          d="M20 55 C50 35, 110 75, 140 45 C130 65, 80 80, 20 55 Z"
          fill="#F472B6"
          opacity="0.85"
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Wireless Mini Speaker',
    category: 'Electronics',
    price: 799,
    rating: 4.8,
    isBestSeller: false,
    inStock: true,
    bgTone: '#EBE8FC',
    svgGraphic: (
      <svg viewBox="0 0 160 100" fill="none" className="shop-product-art">
        <rect x="42" y="32" width="76" height="36" rx="18" fill="#A78BFA" />
        <circle cx="80" cy="50" r="11" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Handmade Soy Candle',
    category: 'Home',
    price: 299,
    rating: 4.9,
    isBestSeller: false,
    inStock: true,
    bgTone: '#FEF3E2',
    svgGraphic: (
      <svg viewBox="0 0 160 100" fill="none" className="shop-product-art">
        <path d="M46 66 C46 44, 114 44, 114 66 Z" fill="#E09B4E" />
        <path d="M58 60 C58 48, 102 48, 102 60" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 4,
    name: 'Organic Gift Set',
    category: 'Beauty',
    price: 650,
    rating: 4.7,
    isBestSeller: false,
    inStock: true,
    bgTone: '#E6F4F1',
    svgGraphic: (
      <svg viewBox="0 0 160 100" fill="none" className="shop-product-art">
        <rect x="48" y="40" width="64" height="42" rx="12" fill="#5FA897" />
        <path d="M62 40 V30 C62 25, 98 25, 98 30 V40" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 5,
    name: 'Minimalist Desk Lamp',
    category: 'Home',
    price: 1099,
    rating: 4.8,
    isBestSeller: false,
    inStock: true,
    bgTone: '#EBF0FE',
    svgGraphic: (
      <svg viewBox="0 0 160 100" fill="none" className="shop-product-art">
        <rect x="44" y="44" width="72" height="44" rx="4" fill="#B4B0FB" />
        <path d="M56 44 V32 H104 V44" stroke="#818CF8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 6,
    name: 'Daily Care Gift Box',
    category: 'Beauty',
    price: 899,
    rating: 4.9,
    isBestSeller: false,
    inStock: true,
    bgTone: '#FDECEF',
    svgGraphic: (
      <svg viewBox="0 0 160 100" fill="none" className="shop-product-art">
        <path d="M38 72 C38 48, 122 48, 122 72 Z" fill="#F472B6" />
        <circle cx="80" cy="40" r="14" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 7,
    name: 'Canvas Sneakers',
    category: 'Fashion',
    price: 1499,
    rating: 4.8,
    isBestSeller: false,
    inStock: true,
    bgTone: '#E8F1FD',
    svgGraphic: (
      <svg viewBox="0 0 160 100" fill="none" className="shop-product-art">
        <path d="M80 34 L114 66 H46 Z" fill="#60A5FA" />
        <rect x="46" y="66" width="68" height="20" fill="#60A5FA" />
        <rect x="58" y="74" width="44" height="6" rx="3" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 8,
    name: 'Local Coffee Blend',
    category: 'Food',
    price: 380,
    rating: 4.7,
    isBestSeller: false,
    inStock: true,
    bgTone: '#FEF3E2',
    svgGraphic: (
      <svg viewBox="0 0 160 100" fill="none" className="shop-product-art">
        <path d="M42 74 C42 46, 118 46, 118 74 Z" fill="#E09B4E" />
        <circle cx="80" cy="46" r="14" fill="#FFFFFF" />
      </svg>
    ),
  },
];

const CATEGORIES = ['All products', 'Fashion', 'Beauty', 'Electronics', 'Food', 'Home'];

export default function Shop({ onNavigateHome, onLogout, onNavigateCart, onNavigateProfile }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All products');
  const [sortBy, setSortBy] = useState('featured');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sliderPrice, setSliderPrice] = useState(5000);
  const [availability, setAvailability] = useState('all'); // 'in_stock' | 'all'
  const [favorites, setFavorites] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showFiltersMobile, setShowFiltersMobile] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter and sort products
  const filteredProducts = INITIAL_SHOP_PRODUCTS.filter((product) => {
    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesCat = product.category.toLowerCase().includes(q);
      if (!matchesName && !matchesCat) return false;
    }

    // Category filter
    if (selectedCategory !== 'All products' && product.category !== selectedCategory) {
      return false;
    }

    // Price range
    const effectiveMax = Math.min(maxPrice || 5000, sliderPrice);
    if (product.price < (minPrice || 0) || product.price > effectiveMax) {
      return false;
    }

    // Availability
    if (availability === 'in_stock' && !product.inStock) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.id - b.id; // default / featured
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All products');
    setSortBy('featured');
    setMinPrice(0);
    setMaxPrice(5000);
    setSliderPrice(5000);
    setAvailability('all');
    setCurrentPage(1);
  };

  return (
    <div className="shop-page">
      {/* 1. TOP NAVBAR */}
      <header className="shop-navbar">
        <div className="shop-navbar-container">
          {/* Logo with purple AI badge */}
          <div
            className="shop-logo"
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
            }}
          >
            <div className="shop-logo-icon">
              <svg viewBox="0 0 36 36" fill="none">
                <rect x="4" y="4" width="28" height="28" rx="8" fill="url(#shopGrad)" />
                <path
                  d="M13 13V11C13 9 15 7 18 7C21 7 23 9 23 11V13"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <rect x="9" y="13" width="18" height="15" rx="3" fill="white" />
                <path d="M14 17C14 19 16 20.5 18 20.5C20 20.5 22 19 22 17" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="shopGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" />
                    <stop offset="0.55" stopColor="#8B5CF6" />
                    <stop offset="1" stopColor="#D946EF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="shop-logo-text">
              Tinda<span className="shop-logo-accent">Link</span>
            </span>
            <span className="shop-ai-badge">AI</span>
          </div>

          {/* Navigation Links */}
          <nav className="shop-nav-links">
            <button
              type="button"
              className="shop-nav-link"
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
              }}
            >
              Home
            </button>
            <button
              type="button"
              className="shop-nav-link active"
              onClick={() => setSelectedCategory('All products')}
            >
              Shop
            </button>
            <button
              type="button"
              className="shop-nav-link"
              onClick={() => setSelectedCategory('All products')}
            >
              Categories
            </button>
            <button
              type="button"
              className="shop-nav-link"
              onClick={() => alert('About TindaLink: A smart marketplace for local businesses.')}
            >
              About
            </button>
          </nav>

          {/* Search Bar in Navbar */}
          <div className="shop-nav-search">
            <svg className="shop-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search products, stores, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Cart & Account */}
          <div className="shop-nav-actions">
            <button type="button" className="shop-cart-btn" aria-label="Cart" onClick={() => { if (onNavigateCart) onNavigateCart(); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </button>
            <button type="button" className="shop-account-btn" onClick={() => { if (onNavigateProfile) onNavigateProfile(); }}>
              <span className="shop-account-avatar"></span>
              <span className="shop-account-label">Account</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN SHOP CONTENT */}
      <main className="shop-main">
        {/* Title Area */}
        <div className="shop-header-area">
          <h1 className="shop-title">Shop All Products</h1>
          <p className="shop-subtitle">
            Discover products from local businesses and growing online sellers.
          </p>
        </div>

        {/* Controls Bar: Category dropdown removed as requested, leaving search, sorting, and filters */}
        <div className="shop-controls-bar">
          {/* Search products input */}
          <div className="shop-search-control">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shop-search-icon">
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

          {/* Sort By Dropdown */}
          <div className="shop-sort-control">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products by"
            >
              <option value="featured">Sort by</option>
              <option value="featured">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shop-chevron-icon">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Filters Toggle Button */}
          <button
            type="button"
            className="shop-filter-toggle-btn"
            onClick={() => setShowFiltersMobile((prev) => !prev)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
            <span>Filters</span>
          </button>
        </div>

        {/* 3. BODY LAYOUT: Sidebar (Filters) + Products Grid */}
        <div className="shop-content-layout">
          {/* Left Sidebar: Filters */}
          <aside className={`shop-sidebar ${showFiltersMobile ? 'show' : ''}`}>
            <h2 className="shop-filter-heading">Filters</h2>

            {/* Categories */}
            <div className="shop-filter-section">
              <h3 className="shop-filter-subheading">Categories</h3>
              <ul className="shop-category-list">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      className={`shop-category-item ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="shop-filter-section">
              <h3 className="shop-filter-subheading">Price Range</h3>
              <div className="shop-price-labels">
                <span>₱ 0</span>
                <span>₱ 5,000+</span>
              </div>
              <div className="shop-slider-wrapper">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="50"
                  value={sliderPrice}
                  onChange={(e) => setSliderPrice(Number(e.target.value))}
                  className="shop-slider"
                />
              </div>
              <div className="shop-price-inputs">
                <input
                  type="number"
                  placeholder="Min price"
                  value={minPrice || ''}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
                <input
                  type="number"
                  placeholder="Max price"
                  value={maxPrice || ''}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Availability */}
            <div className="shop-filter-section">
              <h3 className="shop-filter-subheading">Availability</h3>
              <div className="shop-radio-group">
                <label className="shop-radio-label">
                  <input
                    type="radio"
                    name="availability"
                    value="in_stock"
                    checked={availability === 'in_stock'}
                    onChange={() => setAvailability('in_stock')}
                  />
                  <span className="shop-radio-custom"></span>
                  <span>In stock</span>
                </label>
                <label className="shop-radio-label">
                  <input
                    type="radio"
                    name="availability"
                    value="all"
                    checked={availability === 'all'}
                    onChange={() => setAvailability('all')}
                  />
                  <span className="shop-radio-custom"></span>
                  <span>All products</span>
                </label>
              </div>
            </div>

            {/* Clear filters */}
            <button
              type="button"
              className="shop-clear-filters-btn"
              onClick={handleClearFilters}
            >
              Clear filters
            </button>
          </aside>

          {/* Right Area: Product Grid */}
          <section className="shop-products-section">
            {/* Results Count & Range */}
            <div className="shop-results-header">
              <span className="shop-count-text">
                {filteredProducts.length === 8 ? '128 products' : `${filteredProducts.length} products`}
              </span>
              <span className="shop-showing-text">
                Showing 1–{filteredProducts.length}
              </span>
            </div>

            {/* 4-column Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="shop-empty-state">
                <p>No products match your filters.</p>
                <button type="button" onClick={handleClearFilters} className="shop-link-btn">
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="shop-grid">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="shop-card">
                    {/* Visual Card Image Box */}
                    <div
                      className="shop-card-visual"
                      style={{ backgroundColor: product.bgTone }}
                    >
                      {/* BEST SELLER badge */}
                      {product.isBestSeller && (
                        <span className="shop-badge-bestseller">BEST SELLER</span>
                      )}

                      {/* Favorite / wishlist heart button */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(product.id)}
                        className={`shop-card-fav ${favorites[product.id] ? 'active' : ''}`}
                        aria-label="Save to favorites"
                      >
                        <span className="shop-card-fav-dot"></span>
                      </button>

                      {/* Shape Illustration */}
                      {product.svgGraphic}
                    </div>

                    {/* Product Meta */}
                    <div className="shop-card-info">
                      <h4 className="shop-card-title">{product.name}</h4>
                      <div className="shop-card-price-row">
                        <span className="shop-card-price">₱ {product.price.toLocaleString()}</span>
                        <span className="shop-card-rating">★ {product.rating}</span>
                      </div>
                      <button
                        type="button"
                        className="shop-view-btn"
                        onClick={() => setSelectedProduct(product)}
                      >
                        View product
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination (Matching Frame 24) */}
            <div className="shop-pagination">
              <button
                type="button"
                className={`shop-page-number ${currentPage === 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                type="button"
                className={`shop-page-number ${currentPage === 2 ? 'active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button
                type="button"
                className={`shop-page-number ${currentPage === 3 ? 'active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <span className="shop-page-ellipsis">...</span>
              <button
                type="button"
                className="shop-page-next"
                onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              >
                Next →
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Purple Smiley Assistant (from Frame 24 bottom-right) */}
      <button
        type="button"
        className="shop-floating-help"
        aria-label="TindaLink Help & Support"
        onClick={() => alert('Need assistance? TindaLink support is here to help!')}
      >
        <svg viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#7C3AED" />
          <circle cx="12.5" cy="14.5" r="2.2" fill="white" />
          <circle cx="23.5" cy="14.5" r="2.2" fill="white" />
          <path
            d="M12 21.5 C13.5 25.5, 22.5 25.5, 24 21.5"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Modal for View Product */}
      {selectedProduct && (
        <div className="shop-modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="shop-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="shop-modal-header">
              <h3>{selectedProduct.name}</h3>
              <button
                type="button"
                className="shop-modal-close"
                onClick={() => setSelectedProduct(null)}
              >
                ✕
              </button>
            </div>
            <div className="shop-modal-body">
              <div
                className="shop-modal-visual"
                style={{ backgroundColor: selectedProduct.bgTone }}
              >
                {selectedProduct.svgGraphic}
              </div>
              <div className="shop-modal-details">
                <span className="shop-modal-category">{selectedProduct.category}</span>
                <p className="shop-modal-price">₱ {selectedProduct.price.toLocaleString()}</p>
                <p className="shop-modal-rating">Customer Rating: ★ {selectedProduct.rating} / 5.0</p>
                <p className="shop-modal-desc">
                  Authentic local item crafted by small businesses on the TindaLink marketplace.
                </p>
                <button
                  type="button"
                  className="shop-modal-add-btn"
                  onClick={() => {
                    alert(`Added ${selectedProduct.name} to cart!`);
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}