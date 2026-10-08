import { useState } from 'react';
import './Login.css';

export default function Login({ onAuthSuccess }) {
  // Starts on 'signup' as requested
  const [authView, setAuthView] = useState('signup'); // 'signup' | 'login' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (authView === 'forgot') {
      alert(`Password reset instructions sent to ${email || 'your email'}.`);
      setAuthView('login');
      return;
    }

    if (authView === 'signup') {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please verify and try again.');
        return;
      }
      // IMMEDIATELY load Customer Dashboard upon Sign Up
      if (onAuthSuccess) {
        onAuthSuccess({
          name: fullName || 'Customer',
          email: email
        });
      }
      return;
    }

    if (authView === 'login') {
      // IMMEDIATELY load Customer Dashboard upon Log In
      if (onAuthSuccess) {
        onAuthSuccess({
          name: email.split('@')[0] || 'Customer',
          email: email
        });
      }
    }
  };

  return (
    <div className="tindalink-auth-layout">
      {/* Left Brand Panel: Centered TindaLink Logo with Title Directly Below */}
      <aside className="tindalink-brand-panel">
        <div className="tindalink-brand-centered">
          <div className="tindalink-logo-icon" aria-hidden="true">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.5 13V11.2C13.5 8.88 15.38 7 17.7 7C20.02 7 21.9 8.88 21.9 11.2V13"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <rect x="8.5" y="12.5" width="16.5" height="15.5" rx="3.5" fill="white" />
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
            </svg>
          </div>

          <h1 className="tindalink-brand-title">
            Tinda<span className="tindalink-brand-highlight">Link</span>
          </h1>

          <p className="tindalink-brand-subtitle">Smart access. Secure and simple.</p>
          <p className="tindalink-brand-tagline">
            TindaLink keeps your sign-in and account creation experience clear and consistent.
          </p>
        </div>
      </aside>

      {/* Right Form Panel */}
      <main className="tindalink-form-panel">
        <section className="tindalink-auth-card" aria-label="Authentication">
          {/* SIGN UP VIEW (SHOWS FIRST) */}
          {authView === 'signup' && (
            <>
              <header className="tindalink-card-header">
                <h2>Create account</h2>
                <p>Please sign up to continue</p>
              </header>

              <form className="tindalink-form" onSubmit={handleSubmit}>
                <div className="tindalink-form-row">
                  <label htmlFor="fullName" className="tindalink-row-label">Name:</label>
                  <div className="tindalink-row-input">
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Juan Dela Cruz"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="tindalink-form-row">
                  <label htmlFor="signupEmail" className="tindalink-row-label">Email:</label>
                  <div className="tindalink-row-input">
                    <input
                      id="signupEmail"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="tindalink-form-row">
                  <label htmlFor="signupPassword" className="tindalink-row-label">Password:</label>
                  <div className="tindalink-row-input">
                    <input
                      id="signupPassword"
                      type="password"
                      placeholder="•••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="tindalink-form-row">
                  <label htmlFor="confirmPassword" className="tindalink-row-label">Confirm Password:</label>
                  <div className="tindalink-row-input">
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="•••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="tindalink-alert error">{errorMessage}</div>
                )}

                <div className="tindalink-action-row">
                  <button type="submit" className="tindalink-submit-btn">
                    Sign Up
                  </button>
                </div>
              </form>

              <div className="tindalink-signup-prompt">
                <span>Already have an account?</span>
                <button
                  type="button"
                  className="tindalink-link-btn"
                  onClick={() => {
                    setErrorMessage('');
                    setAuthView('login');
                  }}
                >
                  Log In
                </button>
              </div>
            </>
          )}

          {/* LOGIN VIEW */}
          {authView === 'login' && (
            <>
              <header className="tindalink-card-header">
                <h2>Welcome back</h2>
                <p>Please login to your account</p>
              </header>

              <form className="tindalink-form" onSubmit={handleSubmit}>
                <div className="tindalink-form-row">
                  <label htmlFor="loginEmail" className="tindalink-row-label">Email:</label>
                  <div className="tindalink-row-input">
                    <input
                      id="loginEmail"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="tindalink-form-row">
                  <label htmlFor="loginPassword" className="tindalink-row-label">Password:</label>
                  <div className="tindalink-row-input">
                    <input
                      id="loginPassword"
                      type="password"
                      placeholder="•••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="tindalink-forgot-wrapper">
                  <button
                    type="button"
                    className="tindalink-link-btn"
                    onClick={() => {
                      setErrorMessage('');
                      setAuthView('forgot');
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                {errorMessage && (
                  <div className="tindalink-alert error">{errorMessage}</div>
                )}

                <div className="tindalink-action-row">
                  <button type="submit" className="tindalink-submit-btn">
                    Log In
                  </button>
                </div>
              </form>

              <div className="tindalink-signup-prompt">
                <span>Don&apos;t have an account?</span>
                <button
                  type="button"
                  className="tindalink-link-btn"
                  onClick={() => {
                    setErrorMessage('');
                    setAuthView('signup');
                  }}
                >
                  Sign Up
                </button>
              </div>
            </>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {authView === 'forgot' && (
            <>
              <header className="tindalink-card-header">
                <h2>Reset password</h2>
                <p>Enter your email address and we will send a recovery link.</p>
              </header>

              <form className="tindalink-form" onSubmit={handleSubmit}>
                <div className="tindalink-form-row">
                  <label htmlFor="resetEmail" className="tindalink-row-label">Email:</label>
                  <div className="tindalink-row-input">
                    <input
                      id="resetEmail"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="tindalink-action-row">
                  <button type="submit" className="tindalink-submit-btn">
                    Send Reset Link
                  </button>
                </div>
              </form>

              <div className="tindalink-signup-prompt">
                <span>Remembered your password?</span>
                <button
                  type="button"
                  className="tindalink-link-btn"
                  onClick={() => {
                    setErrorMessage('');
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