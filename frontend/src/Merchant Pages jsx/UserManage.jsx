import { useEffect, useState } from 'react';
import '../Merchant Pages Styling/UserManage.css';
import AdminSidebar from './AdminSidebar.jsx';
import { getAllUsers, toggleUserStatus } from '../services/userService.js';

const initialUsers = [
  {
    id: 'USR-001',
    name: 'Peachy Mangaoang',
    role: 'Customer',
    email: 'peachy@email.com',
    status: 'Active',
    joined: 'Sep 9',
    phone: '0917 555 0101',
    ordersCount: 8,
  },
  {
    id: 'USR-002',
    name: 'Amara Finds',
    role: 'Merchant',
    email: 'amara@email.com',
    status: 'Active',
    joined: 'Sep 2',
    phone: '0918 555 0142',
    ordersCount: 64,
  },
  {
    id: 'USR-003',
    name: 'A. Santos',
    role: 'Customer',
    email: 'asantos@email.com',
    status: 'Active',
    joined: 'Aug 28',
    phone: '0919 555 0188',
    ordersCount: 4,
  },
  {
    id: 'USR-004',
    name: 'L. Garcia',
    role: 'Customer',
    email: 'lgarcia@email.com',
    status: 'Suspended',
    joined: 'Aug 18',
    phone: '0920 555 0199',
    ordersCount: 2,
  },
  {
    id: 'USR-005',
    name: 'J. Reyes',
    role: 'Merchant',
    email: 'jreyes@email.com',
    status: 'Active',
    joined: 'Aug 12',
    phone: '0921 555 0134',
    ordersCount: 41,
  },
  {
    id: 'USR-006',
    name: 'M. Cruz',
    role: 'Customer',
    email: 'mcruz@email.com',
    status: 'Active',
    joined: 'Aug 10',
    phone: '0922 555 0176',
    ordersCount: 11,
  },
];

const filterTabs = ['All Users', 'Customers', 'Merchants', 'Suspended'];

const UserManage = ({ onNavigate, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Users');
  const [modalState, setModalState] = useState({ mode: null, user: null });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      if (Array.isArray(data) && data.length > 0) {
        const mapped = data.map((u) => {
          const fullName = `${u.firstname || ''} ${u.lastname || ''}`.trim() || u.email.split('@')[0];
          let joinedDate = 'Recent';
          if (u.createdAt) {
            try {
              joinedDate = new Date(u.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              });
            } catch (e) {
              joinedDate = 'Recent';
            }
          }
          return {
            id: u.id,
            name: fullName,
            role: u.role || 'Customer',
            email: u.email,
            status: u.status || 'Active',
            joined: joinedDate,
            phone: u.phone || 'N/A',
            ordersCount: 0,
          };
        });
        setUsers(mapped);
      } else {
        setUsers(initialUsers);
      }
    } catch (err) {
      console.warn('Backend unavailable, showing sample data:', err.message);
      setUsers(initialUsers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.role || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeFilter === 'All Users'
        ? true
        : activeFilter === 'Customers'
        ? user.role?.toLowerCase() === 'customer'
        : activeFilter === 'Merchants'
        ? user.role?.toLowerCase() === 'merchant'
        : user.status?.toLowerCase() === 'suspended';

    return matchesSearch && matchesTab;
  });

  const handleExportCsv = () => {
    const headers = ['User', 'Role', 'Email', 'Status', 'Joined'];
    const rows = filteredUsers.map((u) => [
      `"${u.name}"`,
      u.role,
      u.email,
      u.status,
      `"${u.joined}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'tindalink_users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleSuspend = async (userId) => {
    try {
      const updated = await toggleUserStatus(userId);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? { ...u, status: updated.status || (u.status === 'Active' ? 'Suspended' : 'Active') }
            : u
        )
      );
    } catch (err) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
            : u
        )
      );
    }
    setModalState({ mode: null, user: null });
  };

  return (
    <div className="admin-container asidebar-layout">
      <AdminSidebar
        activeTab="users"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="admin-main asidebar-main">
        <header className="admin-top-header asidebar-top-header">
          <div className="admin-role-badge asidebar-role-badge">Administrator</div>
        </header>

        <div className="um-page">
      {/* Header */}
      <header className="um-header">
        <h1 className="um-title">User Management</h1>
        <p className="um-subtitle">
          View customer and merchant accounts and their system status.
        </p>
      </header>

      {/* Search & Export Bar */}
      <section className="um-search-bar">
        <input
          type="text"
          className="um-search-input"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="button"
          className="um-export-btn"
          onClick={handleExportCsv}
        >
          Export Users
        </button>
      </section>

      {/* Filter Pills */}
      <section className="um-tabs">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`um-tab-btn ${activeFilter === tab ? 'active' : ''}`}
            onClick={() => setActiveFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </section>

      {/* Users Table Card */}
      <section className="um-table-card">
        <div className="um-table-wrapper">
          <table className="um-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Email</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="um-user-name">{user.name}</td>
                    <td className="um-role">{user.role}</td>
                    <td className="um-email">{user.email}</td>
                    <td>
                      <span
                        className={`um-status um-status-${user.status.toLowerCase()}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="um-joined">{user.joined}</td>
                    <td>
                      <div className="um-actions">
                        <button
                          type="button"
                          className="um-action-link um-view-link"
                          onClick={() => setModalState({ mode: 'view', user })}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="um-action-link um-manage-link"
                          onClick={() =>
                            setModalState({ mode: 'manage', user })
                          }
                        >
                          Manage
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="um-empty">
                    No users match the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* View / Manage Modal */}
      {modalState.user && (
        <div
          className="um-modal-backdrop"
          onClick={() => setModalState({ mode: null, user: null })}
        >
          <div className="um-modal" onClick={(e) => e.stopPropagation()}>
            <div className="um-modal-header">
              <div>
                <h2 className="um-modal-title">
                  {modalState.mode === 'view'
                    ? 'Account Details'
                    : 'Manage Account'}
                </h2>
                <p className="um-modal-meta">
                  {modalState.user.id} • Joined {modalState.user.joined}
                </p>
              </div>
              <button
                type="button"
                className="um-modal-close"
                onClick={() => setModalState({ mode: null, user: null })}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div className="um-modal-body">
              <div className="um-detail-row">
                <span>Name</span>
                <strong>{modalState.user.name}</strong>
              </div>
              <div className="um-detail-row">
                <span>Role</span>
                <strong>{modalState.user.role}</strong>
              </div>
              <div className="um-detail-row">
                <span>Email</span>
                <strong>{modalState.user.email}</strong>
              </div>
              <div className="um-detail-row">
                <span>Contact</span>
                <strong>{modalState.user.phone}</strong>
              </div>
              <div className="um-detail-row">
                <span>
                  {modalState.user.role === 'Merchant'
                    ? 'Completed Orders'
                    : 'Total Purchases'}
                </span>
                <strong>{modalState.user.ordersCount}</strong>
              </div>
              <div className="um-detail-row">
                <span>System Status</span>
                <span
                  className={`um-status um-status-${modalState.user.status.toLowerCase()}`}
                >
                  {modalState.user.status}
                </span>
              </div>
            </div>

            <div className="um-modal-footer">
              <button
                type="button"
                className="um-btn um-btn-secondary"
                onClick={() => setModalState({ mode: null, user: null })}
              >
                Close
              </button>
              {modalState.mode === 'manage' && (
                <button
                  type="button"
                  className={`um-btn ${
                    modalState.user.status === 'Active'
                      ? 'um-btn-suspend'
                      : 'um-btn-activate'
                  }`}
                  onClick={() => handleToggleSuspend(modalState.user.id)}
                >
                  {modalState.user.status === 'Active'
                    ? 'Suspend Account'
                    : 'Reactivate Account'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
        </div>
      </main>
    </div>
  );
};

export default UserManage;