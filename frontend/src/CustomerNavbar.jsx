import { useEffect, useId, useRef, useState } from 'react';
import './CustomerNavbar.css';

export default function CustomerNavbar({
  activePage = '',
  user,
  showSearch = false,
  searchQuery = '',
  onSearchChange,
  cartCount = 0,
  backAction,
  onNavigateHome,
  onNavigateShop,
  onNavigateCart,
  onNavigateProfile,
  onNavigateOrders,
  onLogout,
}) {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const dropdownRef = useRef(null);
  const gradientId = useId();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const getInitials = () => {
    if (user?.name) {
      const parts = user.name.trim().split(/\s+/);
      return parts.slice(0, 2).map((p) => p[0].toUpperCase()).join('');
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'PM';
  };

  return (
    <>
      <header className="cnav-navbar">
        <div className="cnav-container">
          <div className="cnav-left">
            <button
              type="button"
              className="cnav-logo"
              onClick={() => onNavigateHome?.()}
              aria-label="TindaLink Home"
            >
              <div className="cnav-logo-icon">
                <svg viewBox="0 0 36 36" fill="none">
                  <rect x="4" y="4" width="28" height="28" rx="8" fill={`url(#${gradientId})`} />
                  <path
                    d="M13 13V11C13 9 15 7 18 7C21 7 23 9 23 11V13"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <rect x="9" y="13" width="18" height="15" rx="3" fill="white" />
                  <path
                    d="M14 17C14 19 16 20.5 18 20.5C20 20.5 22 19 22 17"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366F1" />
                      <stop offset="0.55" stopColor="#8B5CF6" />
                      <stop offset="1" stopColor="#D946EF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="cnav-logo-text">
                Tinda<span className="cnav-logo-accent">Link</span>
              </span>
            </button>

            <nav className="cnav-links" aria-label="Main navigation">
              <button
                type="button"
                className={`cnav-link ${activePage === 'Home' ? 'active' : ''}`}
                onClick={() => onNavigateHome?.()}
              >
                Home
              </button>
              <button
                type="button"
                className={`cnav-link ${activePage === 'Shop' ? 'active' : ''}`}
                onClick={() => onNavigateShop?.()}
              >
                Shop
              </button>
              <button
                type="button"
                className="cnav-link"
                onClick={() => setShowAboutModal(true)}
              >
                About
              </button>
            </nav>
          </div>

          <div className="cnav-right">
            {showSearch && (
              <div className="cnav-search-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                />
              </div>
            )}

            {backAction && (
              <button
                type="button"
                className="cnav-back-btn"
                onClick={backAction.onClick}
              >
                {backAction.label}
              </button>
            )}

            <button
              type="button"
              className="cnav-cart-btn"
              aria-label="Cart"
              onClick={() => onNavigateCart?.()}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && <span className="cnav-cart-badge">{cartCount}</span>}
            </button>

            <div className="cnav-account-wrapper" ref={dropdownRef}>
              <button
                type="button"
                className="cnav-account-pill"
                aria-expanded={showAccountDropdown}
                aria-haspopup="menu"
                onClick={() => setShowAccountDropdown((prev) => !prev)}
              >
                <div className="cnav-avatar">{getInitials()}</div>
                <span>Account</span>
              </button>

              {showAccountDropdown && (
                <div className="cnav-account-dropdown" role="menu">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setShowAccountDropdown(false);
                      onNavigateProfile?.();
                    }}
                  >
                    My Profile
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setShowAccountDropdown(false);
                      onNavigateOrders?.();
                    }}
                  >
                    My Orders
                  </button>
                  <hr />
                  <button
                    type="button"
                    role="menuitem"
                    className="danger"
                    onClick={() => {
                      setShowAccountDropdown(false);
                      onLogout?.();
                    }}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showAboutModal && (
        <div className="cnav-about-backdrop" onClick={() => setShowAboutModal(false)}>
          <div className="cnav-about-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cnav-about-header">
              <h3>About TindaLink</h3>
              <button
                type="button"
                className="cnav-about-close"
                onClick={() => setShowAboutModal(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <p className="cnav-about-body">
              TindaLink is a smart marketplace connecting customers with local businesses and growing online sellers in one unified storefront.
            </p>
            <button
              type="button"
              className="cnav-about-ok"
              onClick={() => setShowAboutModal(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
