import { useId } from 'react';
import '../Merchant Pages Styling/AdminSidebar.css';

const ADMIN_MAIN_TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'users', label: 'Users' },
  { id: 'merchants', label: 'Merchants' },
  { id: 'products', label: 'Products' },
  { id: 'orders', label: 'Orders' },
];

export default function AdminSidebar({ activeTab, onNavigate, onLogout }) {
  const gradientId = useId();

  return (
    <aside className="asidebar">
      <div className="asidebar-brand">
        <div className="asidebar-logo-icon" aria-hidden="true">
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
        <span className="asidebar-brand-name">
          <span className="asidebar-logo-white">Tinda</span>
          <span className="asidebar-logo-purple">Link</span>
        </span>
      </div>

      <div className="asidebar-section-label">ADMIN CONSOLE</div>

      <nav className="asidebar-nav" aria-label="Admin navigation">
        {ADMIN_MAIN_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`asidebar-nav-item ${activeTab === tab.id ? 'active' : ''}`}
            aria-current={activeTab === tab.id ? 'page' : undefined}
            onClick={() => onNavigate?.(tab.id)}
          >
            {tab.label}
          </button>
        ))}

        <div className="asidebar-divider" />

        <button
          type="button"
          className={`asidebar-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          aria-current={activeTab === 'settings' ? 'page' : undefined}
          onClick={() => onNavigate?.('dashboard')}
        >
          System Settings
        </button>
      </nav>

      <div className="asidebar-footer">
        <p className="asidebar-account-title">Admin Account</p>
        <p className="asidebar-account-email">admin@tindalink.ai</p>
        {onLogout && (
          <button type="button" className="asidebar-logout-btn" onClick={onLogout}>
            Log out
          </button>
        )}
      </div>
    </aside>
  );
}
