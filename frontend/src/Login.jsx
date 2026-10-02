import { useState } from 'react';
import './App.css';

export default function Login() {

  const [role, setRole] = useState('merchant');
  const [authView, setAuthView] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStatusMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    if (authView === 'forgot') {
      setStatusMessage({
        type: 'success',
        text: `Password reset instructions sent to ${email || 'your email'}.`
      });
      return;
    }

    if (authView === 'signup') {
      if (password !== confirmPassword) {
        setStatusMessage({ type: 'error', text: 'Passwords do not match.' });
        return;
      }
      setStatusMessage({
        type: 'success',
        text: `Customer account created for ${fullName || email}. You can now log in.`
      });
      setAuthView('login');
      return;
    }

    // Login submission (ready to connect to your Spring Boot UserService / AuthController)
    setStatusMessage({
      type: 'success',
      text:
        role === 'merchant'
          ? `Signed in as Merchant & System Admin (${email}). Entering Merchant Workspace...`
          : `Signed in as Customer (${email}). Entering Customer Storefront...`
    });
  };

  return (
    <div className="tindalink-auth-layout">
      {/* Left Brand Panel */}
      <aside className="tindalink-brand-panel">
        <div className="tindalink-logo-lockup">
          <div className="tindalink-logo-icon" aria-hidden="true">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.5 13V11.2C13.5 8.8804 15.3804 7 17.7 7C20.0196 7 21.9 8.8804 21.9 11.2V13"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <rect x="8.5" y="12.5" width="16.5" height="15.5" rx="3.5" fill="white" />
              <path
                d="M13.5 16.5C13.5 18.433 15.067 20 17 20C18.933 20 20.5 18.433 20.5 16.5"
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
            </svg>
          </div>
          <span className="tindalink-brand-name">
            Tinda<span className="tindalink-brand-highlight">Link</span>
          </span>
        </div>

        <div className="tindalink-hero-copy">
          <h1>
            Smart access.
            <br />
            One account.
          </h1>
          <p>Your selected role controls the workspace you enter.</p>
        </div>
      </aside>

      {/* Right Form Panel */}
      <main className="tindalink-form-panel">
        <section className="tindalink-auth-card" aria-label="Authentication">
          {authView === 'login' && (
            <>
              <header className="tindalink-card-header">
                <h2>Welcome back</h2>
                <p>Choose your account type, then sign in.</p>
              </header>

              {/* 2-Role Selector: Customer and Merchant (Admin button removed) */}
              <div className="tindalink-role-selector" role="group" aria-label="Account role">
                <button
                  type="button"
                  className={`tindalink-role-btn ${role === 'customer' ? 'active' : ''}`}
                  onClick={() => handleRoleSelect('customer')}
                >
                  Customer
                </button>
                <button
                  type="button"
                  className={`tindalink-role-btn ${role === 'merchant' ? 'active' : ''}`}
                  onClick={() => handleRoleSelect('merchant')}
                >
                  Merchant
                </button>
              </div>

              <form className="tindalink-form" onSubmit={handleSubmit}>
                <div className="tindalink-field">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="tindalink-field">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="•••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="tindalink-forgot-row">
                  <button
                    type="button"
                    className="tindalink-link-btn"
                    onClick={() => {
                      setStatusMessage(null);
                      setAuthView('forgot');
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                {statusMessage && (
                  <div className={`tindalink-alert ${statusMessage.type}`}>
                    {statusMessage.text}
                  </div>
                )}

                <button type="submit" className="tindalink-submit-btn">
                  Log In
                </button>
              </form>

              <div className="tindalink-signup-prompt">
                <span>Don&apos;t have an account?</span>
                <button
                  type="button"
                  className="tindalink-link-btn"
                  onClick={() => {
                    setStatusMessage(null);
                    setRole('customer');
                    setAuthView('signup');
                  }}
                >
                  Sign Up
                </button>
              </div>

              <div className="tindalink-role-note">
                Role selected above determines the next workspace.
              </div>
            </>
          )}

          {authView === 'signup' && (
            <>
              <header className="tindalink-card-header">
                <h2>Create account</h2>
                <p>Sign up as a TindaLink customer to start ordering.</p>
              </header>

              <form className="tindalink-form" onSubmit={handleSubmit}>
                <div className="tindalink-field">
                  <label htmlFor="fullName">Full name</label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Juan Dela Cruz"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="tindalink-field">
                  <label htmlFor="signupEmail">Email address</label>
                  <input
                    id="signupEmail"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="tindalink-field">
                  <label htmlFor="signupPassword">Password</label>
                  <input
                    id="signupPassword"
                    type="password"
                    placeholder="•••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="tindalink-field">
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="•••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {statusMessage && (
                  <div className={`tindalink-alert ${statusMessage.type}`}>
                    {statusMessage.text}
                  </div>
                )}

                <button type="submit" className="tindalink-submit-btn">
                  Sign Up
                </button>
              </form>

              <div className="tindalink-signup-prompt">
                <span>Already have an account?</span>
                <button
                  type="button"
                  className="tindalink-link-btn"
                  onClick={() => {
                    setStatusMessage(null);
                    setAuthView('login');
                  }}
                >
                  Log In
                </button>
              </div>
            </>
          )}

          {authView === 'forgot' && (
            <>
              <header className="tindalink-card-header">
                <h2>Reset password</h2>
                <p>Enter your email address and we will send a recovery link.</p>
              </header>

              <form className="tindalink-form" onSubmit={handleSubmit}>
                <div className="tindalink-field">
                  <label htmlFor="resetEmail">Email address</label>
                  <input
                    id="resetEmail"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {statusMessage && (
                  <div className={`tindalink-alert ${statusMessage.type}`}>
                    {statusMessage.text}
                  </div>
                )}

                <button type="submit" className="tindalink-submit-btn">
                  Send Reset Link
                </button>
              </form>

              <div className="tindalink-signup-prompt">
                <span>Remembered your password?</span>
                <button
                  type="button"
                  className="tindalink-link-btn"
                  onClick={() => {
                    setStatusMessage(null);
                    setAuthView('login');
                  }}
                >
                  Back to Log In
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;