import { useEffect, useRef, useState } from 'react';
import './Dashboard.css';

const CATEGORIES = [
  {
    id: 'fashion',
    name: 'Fashion',
    subtitle: 'Clothes & accessories',
    iconBg: '#F3ECFF',
    iconColor: '#7C3AED',
    svgIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: 'beauty',
    name: 'Beauty',
    subtitle: 'Care & cosmetics',
    iconBg: '#FDF2F8',
    iconColor: '#EC4899',
    svgIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 1 5 5v3H7V7a5 5 0 0 1 5-5z" />
        <rect x="5" y="10" width="14" height="12" rx="2" />
      </svg>
    ),
  },
  {
    id: 'electronics',
    name: 'Electronics',
    subtitle: 'Devices & gadgets',
    iconBg: '#EFF6FF',
    iconColor: '#3B82F6',
    svgIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 'food',
    name: 'Food',
    subtitle: 'Local delicacies',
    iconBg: '#FEFCE8',
    iconColor: '#EAB308',
    svgIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    id: 'home',
    name: 'Home',
    subtitle: 'Home essentials',
    iconBg: '#ECFDF5',
    iconColor: '#10B981',
    svgIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

const FEATURED_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Everyday Tote Bag',
    price: 450,
    rating: 4.9,
    category: 'Fashion',
    gradient: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
    illustration: (
      <div className="dash-art-box">
        <div className="dash-art-tote-outer">
          <div className="dash-art-tote-inner" />
        </div>
      </div>
    ),
  },
  {
    id: 'prod-2',
    name: 'Wireless Mini Speaker',
    price: 799,
    rating: 4.8,
    category: 'Electronics',
    gradient: 'linear-gradient(135deg, #EDE9FE 0%, #E0E7FF 100%)',
    illustration: (
      <div className="dash-art-box">
        <div className="dash-art-speaker">
          <div className="dash-art-speaker-dot" />
          <div className="dash-art-speaker-dot" />
        </div>
      </div>
    ),
  },
  {
    id: 'prod-3',
    name: 'Handmade Soy Candle',
    price: 299,
    rating: 4.9,
    category: 'Home',
    gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
    illustration: (
      <div className="dash-art-box">
        <div className="dash-art-candle">
          <div className="dash-art-candle-flame" />
          <div className="dash-art-candle-wax" />
        </div>
      </div>
    ),
  },
  {
    id: 'prod-4',
    name: 'Organic Gift Set',
    price: 650,
    rating: 4.7,
    category: 'Beauty',
    gradient: 'linear-gradient(135deg, #E0F2FE 0%, #DCFCE7 100%)',
    illustration: (
      <div className="dash-art-box">
        <div className="dash-art-gift-outer">
          <div className="dash-art-gift-inner" />
        </div>
      </div>
    ),
  },
];

export default function Dashboard({
  user = { name: 'Peachy Mangaoang', email: 'peachy@email.com' },
  cartCount: propCartCount,
  onNavigateShop,
  onNavigateCart,
  onNavigateOrders,
  onNavigateProfile,
  onAddToCart,
  onLogout,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [localCartCount, setLocalCartCount] = useState(2);
  const [favorites, setFavorites] = useState({});
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [actionNotice, setActionNotice] = useState('');
  const accountRef = useRef(null);

  const cartCount = propCartCount ?? localCartCount;
  const userInitial = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'P';

  useEffect(() => {
    if (!showAccountDropdown) return undefined;

    const handleOutsideClick = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowAccountDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [showAccountDropdown]);

  const filteredFeatured = FEATURED_PRODUCTS.filter((prod) => {
    const matchesCat = !selectedCategory || prod.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      prod.name.toLowerCase().includes(q) ||
      prod.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const handleGoShop = (category = '') => {
    if (onNavigateShop) {
      onNavigateShop(category);
    } else if (category) {
      setSelectedCategory((prev) => (prev === category ? '' : category));
    }
  };

  const handleAddProductToCart = (prod) => {
    if (onAddToCart) {
      onAddToCart(prod);
    } else {
      setLocalCartCount((c) => c + 1);
    }
    setActionNotice(`Added ${prod.name} to your cart.`);
    setTimeout(() => setActionNotice(''), 2500);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="dash-page">
      {/* 1. TOP NAVBAR (Home & Shop only) */}
      <header className="dash-navbar">
        <div className="dash-navbar-container">
          {/* Logo */}
          <div className="dash-logo" onClick={() => setSelectedCategory('')}>
            <div className="dash-logo-icon" aria-hidden="true">
              <svg viewBox="0 0 36 36" fill="none">
                <rect x="2" y="2" width="32" height="32" rx="9" fill="url(#dashLogoGrad)" />
                <path
                  d="M13.5 13V11.2C13.5 8.88 15.38 7 17.7 7C20.02 7 21.9 8.88 21.9 11.2V13"
                  stroke="white"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <rect x="8.5" y="12.5" width="16.5" height="15.5" rx="3.5" fill="white" fillOpacity="0.95" />
                <path
                  d="M13.5 16.5C13.5 18.43 15.07 20 17 20C18.93 20 20.5 18.43 20.5 16.5"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <rect
                  x="19.5"
                  y="18.5"
                  width="9.5"
                  height="9.5"
                  rx="2.8"
                  transform="rotate(-12 19.5 18.5)"
                  fill="#F5D0FE"
                  stroke="#7C3AED"
                  strokeWidth="1.5"
                />
                <circle cx="24.2" cy="22.3" r="1.3" fill="#7C3AED" />
                <defs>
                  <linearGradient id="dashLogoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5B34F2" />
                    <stop offset="0.55" stopColor="#8839EF" />
                    <stop offset="1" stopColor="#D668B6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="dash-logo-text">
              Tinda<span className="dash-logo-accent">Link</span>
            </span>
          </div>

          {/* Navigation Links: Home & Shop only */}
          <nav className="dash-nav-links" aria-label="Customer Navigation">
            <button
              type="button"
              className="dash-nav-link active"
              onClick={() => setSelectedCategory('')}
            >
              Home
            </button>
            <button
              type="button"
              className="dash-nav-link"
              onClick={() => handleGoShop()}
            >
              Shop
            </button>
          </nav>

          {/* Search bar */}
          <div className="dash-nav-search">
            <svg
              className="dash-search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
            />
          </div>

          {/* Right Action Icons (Cart + Account) */}
          <div className="dash-nav-actions">
            <button
              type="button"
              className="dash-cart-btn"
              onClick={() => {
                if (onNavigateCart) onNavigateCart();
              }}
              aria-label="View Shopping Cart"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && <span className="dash-cart-badge">{cartCount}</span>}
            </button>

            <div className="dash-account-wrapper" ref={accountRef}>
              <button
                type="button"
                className="dash-account-btn"
                onClick={() => setShowAccountDropdown((prev) => !prev)}
                aria-expanded={showAccountDropdown}
                aria-haspopup="menu"
              >
                <span className="dash-account-avatar">{userInitial}</span>
                <span className="dash-account-label">Account</span>
              </button>

              {showAccountDropdown && (
                <div className="dash-account-dropdown" role="menu">
                  <div className="dash-dropdown-header">
                    <p className="dash-dropdown-name">{user?.name || 'Customer'}</p>
                    <p className="dash-dropdown-email">{user?.email || 'customer@tindalink.ph'}</p>
                  </div>

                  <button
                    type="button"
                    role="menuitem"
                    className="dash-dropdown-item"
                    onClick={() => {
                      setShowAccountDropdown(false);
                      if (onNavigateProfile) {
                        onNavigateProfile();
                      } else {
                        setActionNotice('Opening My Profile...');
                      }
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>My Profile</span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    className="dash-dropdown-item"
                    onClick={() => {
                      setShowAccountDropdown(false);
                      if (onNavigateOrders) {
                        onNavigateOrders();
                      } else {
                        setActionNotice('Opening My Orders...');
                      }
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                    <span>My Orders</span>
                  </button>

                  <div className="dash-dropdown-divider" />

                  <button
                    type="button"
                    role="menuitem"
                    className="dash-dropdown-item dash-dropdown-logout"
                    onClick={() => {
                      setShowAccountDropdown(false);
                      if (onLogout) {
                        onLogout();
                      } else {
                        setActionNotice('Logged out.');
                      }
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN DASHBOARD CONTENT */}
      <main className="dash-main">
        {actionNotice && (
          <div className="dash-toast" role="status">
            {actionNotice}
          </div>
        )}

        {/* HERO BANNER */}
        <section className="dash-hero">
          <div className="dash-hero-inner">
            <h1 className="dash-hero-title">
              Shop smarter.
              <br />
              Support local.
            </h1>
            <p className="dash-hero-subtitle">
              Discover products from growing businesses and local sellers all in one smart marketplace.
            </p>
            <button
              type="button"
              className="dash-hero-btn"
              onClick={() => handleGoShop()}
            >
              Start Shopping
            </button>
          </div>
        </section>

        {/* 3. SHOP BY CATEGORY SECTION */}
        <section className="dash-section">
          <div className="dash-section-head">
            <div>
              <h2 className="dash-section-title">Shop by Category</h2>
              <p className="dash-section-subtitle">
                Explore products from different local businesses.
              </p>
            </div>
            <button
              type="button"
              className="dash-view-all-btn"
              onClick={() => handleGoShop()}
            >
              <span>View all</span>
              <span>→</span>
            </button>
          </div>

          <div className="dash-category-grid">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  handleGoShop(cat.name);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedCategory(cat.name);
                    handleGoShop(cat.name);
                  }
                }}
                className={`dash-category-card ${
                  selectedCategory === cat.name ? 'is-selected' : ''
                }`}
              >
                <div
                  className="dash-category-icon"
                  style={{ backgroundColor: cat.iconBg }}
                >
                  {cat.svgIcon}
                </div>
                <div>
                  <h3 className="dash-category-name">{cat.name}</h3>
                  <p className="dash-category-sub">{cat.subtitle}</p>
                </div>
              </div>
            ))}

            <div
              role="button"
              tabIndex={0}
              className="dash-discover-card"
              onClick={() => handleGoShop()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleGoShop();
                }
              }}
            >
              <span className="dash-discover-eyebrow">More to Discover</span>
              <p className="dash-discover-copy">Find your next favorite product.</p>
            </div>
          </div>
        </section>

        {/* 4. FEATURED PRODUCTS SECTION */}
        <section className="dash-section">
          <div className="dash-section-head">
            <div>
              <h2 className="dash-section-title">Featured Products</h2>
              <p className="dash-section-subtitle">Popular picks from local sellers.</p>
            </div>
          </div>

          <div className="dash-products-grid">
            {filteredFeatured.map((prod) => (
              <article key={prod.id} className="dash-product-card">
                <div
                  className="dash-product-visual"
                  style={{ background: prod.gradient }}
                >
                  <button
                    type="button"
                    className={`dash-fav-btn ${favorites[prod.id] ? 'active' : ''}`}
                    onClick={() => toggleFavorite(prod.id)}
                    aria-label={`Favorite ${prod.name}`}
                  >
                    <svg viewBox="0 0 24 24" fill={favorites[prod.id] ? '#f43f5e' : 'none'} stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                  {prod.illustration}
                </div>

                <div className="dash-product-body">
                  <h3 className="dash-product-name">{prod.name}</h3>
                  <div className="dash-product-meta">
                    <span className="dash-product-price">₱ {prod.price}</span>
                    <span className="dash-product-rating">★ {prod.rating}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="dash-add-cart-btn"
                  onClick={() => handleAddProductToCart(prod)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}