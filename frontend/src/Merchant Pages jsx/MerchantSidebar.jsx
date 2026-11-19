import '../Merchant Pages Styling/MerchantSidebar.css';

const MERCHANT_TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'products', label: 'Products' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'orders', label: 'Orders' },
  { id: 'payments', label: 'Payments' },
  { id: 'store', label: 'Store' },
  { id: 'social-media', label: 'Social Media' },
  { id: 'settings', label: 'Settings' },
];

export default function MerchantSidebar({ activeTab, onNavigate, onLogout }) {
  return (
    <aside className="msidebar">
      <div className="msidebar-header">
        <h2>
          <span className="msidebar-logo-white">Tinda</span>
          <span className="msidebar-logo-purple">Link</span>
        </h2>
        <span className="msidebar-subtitle">MERCHANT</span>
      </div>

      <nav className="msidebar-nav" aria-label="Merchant navigation">
        {MERCHANT_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`msidebar-nav-item ${activeTab === tab.id ? 'active' : ''}`}
            aria-current={activeTab === tab.id ? 'page' : undefined}
            onClick={() => onNavigate?.(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="msidebar-footer">
        <p>
          <span className="msidebar-logo-white">Tinda</span>
          <span className="msidebar-logo-purple">Link</span>
        </p>
        {onLogout && (
          <button type="button" className="msidebar-logout-btn" onClick={onLogout}>
            Log out
          </button>
        )}
      </div>
    </aside>
  );
}
