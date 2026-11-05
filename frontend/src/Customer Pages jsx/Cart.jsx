import { useState } from 'react';
import '../Customer Pages Styling/Cart.css';

const INITIAL_CART_ITEMS = [
  {
    id: 1,
    name: 'Everyday Tote Bag',
    store: 'Amara Finds',
    price: 450,
    qty: 1,
    bgTone: '#FDECEF',
    svgGraphic: (
      <svg viewBox="0 0 100 70" fill="none" className="cart-item-art">
        <path
          d="M15 38 C35 22, 75 52, 90 30 C80 45, 55 55, 15 38 Z"
          fill="#F472B6"
          opacity="0.85"
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Wireless Mini Speaker',
    store: 'Amara Finds',
    price: 799,
    qty: 2,
    bgTone: '#EBE8FC',
    svgGraphic: (
      <svg viewBox="0 0 100 70" fill="none" className="cart-item-art">
        <rect x="25" y="20" width="50" height="26" rx="13" fill="#A78BFA" />
        <circle cx="50" cy="33" r="8" fill="#FFFFFF" />
      </svg>
    ),
  },
];

export default function Cart({ onNavigateShop, onNavigateHome, onNavigateCheckout }) {
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const handleUpdateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const total = subtotal; // Delivery is calculated at checkout

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCheckedOut(true);
  };

  return (
    <div className="cart-page">
      {/* 1. TOP NAVBAR (Consistent with TindaLink Theme) */}
      <header className="cart-navbar">
        <div className="cart-navbar-container">
          {/* Logo with purple AI badge */}
          <div
            className="cart-logo"
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
            }}
          >
            <div className="cart-logo-icon">
              <svg viewBox="0 0 36 36" fill="none">
                <rect x="4" y="4" width="28" height="28" rx="8" fill="url(#cartGrad)" />
                <path
                  d="M13 13V11C13 9 15 7 18 7C21 7 23 9 23 11V13"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <rect x="9" y="13" width="18" height="15" rx="3" fill="white" />
                <path d="M14 17C14 19 16 20.5 18 20.5C20 20.5 22 19 22 17" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="cartGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" />
                    <stop offset="0.55" stopColor="#8B5CF6" />
                    <stop offset="1" stopColor="#D946EF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="cart-logo-text">
              Tinda<span className="cart-logo-accent">Link</span>
            </span>
            <span className="cart-ai-badge">AI</span>
          </div>

          {/* Quick return buttons */}
          <div className="cart-nav-actions">
            <button
              type="button"
              className="cart-nav-back-btn"
              onClick={() => {
                if (onNavigateShop) onNavigateShop();
                else if (onNavigateHome) onNavigateHome();
              }}
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN CART CONTENT */}
      <main className="cart-main">
        {/* Title Area */}
        <div className="cart-header-area">
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-subtitle">
            Review your selected products before checkout.
          </p>
        </div>

        {/* 2-Column Layout matching CUS-04 */}
        <div className="cart-content-layout">
          {/* Left Column: Products Card */}
          <div className="cart-items-card">
            <div className="cart-items-header">
              <h2 className="cart-items-count">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </h2>
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-empty-state">
                <p>Your shopping cart is currently empty.</p>
                <button
                  type="button"
                  className="cart-shop-now-btn"
                  onClick={() => {
                    if (onNavigateShop) onNavigateShop();
                    else if (onNavigateHome) onNavigateHome();
                  }}
                >
                  Explore Products
                </button>
              </div>
            ) : (
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    {/* Visual Thumbnail */}
                    <div
                      className="cart-item-thumbnail"
                      style={{ backgroundColor: item.bgTone }}
                    >
                      {item.svgGraphic}
                    </div>

                    {/* Product & Store Info */}
                    <div className="cart-item-info">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-store">{item.store}</p>
                      <span className="cart-item-price">
                        ₱ {item.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Quantity Selector matching CUS-04 */}
                    <div className="cart-item-quantity-wrapper">
                      <div className="cart-qty-pill">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => handleUpdateQty(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="cart-qty-value">{item.qty}</span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => handleUpdateQty(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="cart-item-delete"
                        onClick={() => handleRemoveItem(item.id)}
                        title="Remove product"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Order Summary Card */}
          <aside className="cart-summary-card">
            <h2 className="cart-summary-title">Order Summary</h2>

            <div className="cart-summary-rows">
              <div className="cart-summary-row">
                <span className="cart-summary-label">Subtotal</span>
                <span className="cart-summary-value font-bold">
                  ₱ {subtotal.toLocaleString()}
                </span>
              </div>

              <div className="cart-summary-row">
                <span className="cart-summary-label">Delivery</span>
                <span className="cart-summary-muted">Calculated at checkout</span>
              </div>
            </div>

            <div className="cart-summary-total-row">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-value">
                ₱ {total.toLocaleString()}
              </span>
            </div>

            <button
              type="button"
              className="cart-checkout-btn"
              disabled={cartItems.length === 0}
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </main>

      {/* Checkout Success Modal */}
      {isCheckedOut && (
        <div className="cart-modal-backdrop" onClick={() => setIsCheckedOut(false)}>
          <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="cart-modal-icon">✓</div>
            <h3>Order Ready for Checkout!</h3>
            <p>
              Your order of <strong>{totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}</strong> totaling{' '}
              <strong>₱ {total.toLocaleString()}</strong> from <strong>Amara Finds</strong> has been prepared for shipping details.
            </p>
            <div className="cart-modal-actions">
              <button
                type="button"
                className="cart-modal-confirm-btn"
                onClick={() => {
                  setIsCheckedOut(false);
                  if (onNavigateCheckout) onNavigateCheckout();
                }}
              >
                Continue to Checkout
              </button>
              <button
                type="button"
                className="cart-modal-close-btn"
                onClick={() => setIsCheckedOut(false)}
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}