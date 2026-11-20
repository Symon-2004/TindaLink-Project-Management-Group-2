import { useState } from 'react';
import './Login.css';

export default function Login({ customers = [], onLoginSuccess }) {
  const [authView, setAuthView] = useState('login'); // 'login' | 'signup' | 'forgot'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [validationError, setValidationError] = useState('none'); // 'none' | 'incorrect_password' | 'email_not_found'
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail === 'wrong-email@example.com') {
      setValidationError('email_not_found');
      return;
    }

    if (password === 'wrongpassword' || (password.length > 0 && password.length < 5)) {
      setValidationError('incorrect_password');
      return;
    }

    setIsSubmitting(true);
    setValidationError('none');

    try {
      /*
       * BACKEND INTEGRATION EXAMPLE:
       * Replace this block with your real API call when your backend endpoint is ready:
       *
       * const response = await fetch('http://localhost:8080/api/auth/login', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify({ email: cleanEmail, password }),
       * });
       * if (response.status === 404) {
       *   setValidationError('email_not_found');
       *   return;
       * }
       * if (!response.ok) {
       *   setValidationError('incorrect_password');
       *   return;
       * }
       * const data = await response.json();
       * if (data.token) localStorage.setItem('tindalink_token', data.token);
       * onLoginSuccess({ email: data.email, name: data.name, role: data.role });
       * return;
       */

      const isMerchantOrAdmin =
        cleanEmail.includes('merchant') ||
        cleanEmail.includes('admin') ||
        cleanEmail === 'merchant@tindalink.ph';

      if (isMerchantOrAdmin) {
        onLoginSuccess?.({
          email: cleanEmail || 'merchant@tindalink.ph',
          name: 'TindaLink Merchant (Admin)',
          role: 'merchant',
        });
      } else {
        const existingCustomer = customers.find(
          (c) => c.email.toLowerCase() === cleanEmail
        );
        const derivedName =
          existingCustomer?.name ||
          cleanEmail
            .split('@')[0]
            .replace(/[._-]/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());

        onLoginSuccess?.({
          email: cleanEmail || 'peachy@email.com',
          name: derivedName || 'Customer',
          role: 'customer',
        });
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Unable to sign in right now. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    if (password.length < 4) {
      setFeedback({
        type: 'error',
        message: 'Password must be at least 4 characters.',
      });
      return;
    }

    if (password !== confirmPassword) {
      setFeedback({
        type: 'error',
        message: 'Passwords do not match. Please verify and try again.',
      });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim() || 'New TindaLink Customer';

    setIsSubmitting(true);

    try {
      /*
       * BACKEND INTEGRATION EXAMPLE:
       * const response = await fetch('http://localhost:8080/api/auth/register', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify({ fullName: cleanName, email: cleanEmail, password }),
       * });
       * if (!response.ok) {
       *   const err = await response.json();
       *   setFeedback({ type: 'error', message: err.message || 'Registration failed.' });
       *   return;
       * }
       * const data = await response.json();
       * onLoginSuccess({ email: data.email, name: data.name, role: data.role || 'customer' }, true);
       * return;
       */

      setValidationError('none');
      onLoginSuccess?.(
        {
          email: cleanEmail,
          name: cleanName,
          role: 'customer',
        },
        true
      );
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Unable to create account right now.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    const targetEmail = email.trim() || 'your registered email';
    setFeedback({
      type: 'success',
      message: `Password reset link sent to ${targetEmail}. Check your inbox to set a new password.`,
    });
  };

  let loginSubtitle = 'Please login to your account';
  if (validationError === 'incorrect_password') {
    loginSubtitle = "We couldn't sign you in with those credentials.";
  } else if (validationError === 'email_not_found') {
    loginSubtitle = "We couldn't find an account with that email.";
  }

  return (
    <div className="tl-auth-page">
      {/* Left Brand Panel */}
      <aside className="tl-auth-brand-panel">
        <div className="tl-auth-brand-content">
          <div className="tl-auth-logo-box" aria-hidden="true">
            <svg viewBox="0 0 36 36" fill="none">
              <path
                d="M13.5 13V11.2C13.5 8.8804 15.3804 7 17.7 7C20.0196 7 21.9 8.8804 21.9 11.2V13"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <rect
                x="8.5"
                y="12.5"
                width="16.5"
                height="15.5"
                rx="3.5"
                fill="white"
                fillOpacity="0.95"
              />
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
              <circle cx="24.2" cy="22.3" r="1.3" fill="#7C3AED" />
            </svg>
          </div>

          <h1 className="tl-auth-brand-title">
            Tinda<span>Link</span>
          </h1>
          <p className="tl-auth-brand-tagline">
            TindaLink keeps your sign-in and account creation experience clear and consistent.
          </p>
        </div>
      </aside>

      {/* Right Authentication Form Panel */}
      <main className="tl-auth-main">
        <section aria-label="TindaLink Authentication" className="tl-auth-card">
          {/* LOGIN VIEW */}
          {authView === 'login' && (
            <>
              <header className="tl-auth-header">
                <h2>Welcome back</h2>
                <p>{loginSubtitle}</p>
              </header>

              <form onSubmit={handleLoginSubmit} className="tl-auth-form">
                <div className="tl-auth-field">
                  <label htmlFor="login-email">Email Address</label>
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (validationError === 'email_not_found') {
                        setValidationError('none');
                      }
                    }}
                    placeholder="you@example.com"
                    required
                    className={
                      validationError === 'email_not_found' ? 'has-error' : ''
                    }
                  />
                  {validationError === 'email_not_found' && (
                    <p className="tl-auth-field-error">
                      Email address not found. Please check the email.
                    </p>
                  )}
                </div>

                <div className="tl-auth-field">
                  <div className="tl-auth-label-row">
                    <label htmlFor="login-password">Password</label>
                    <button
                      type="button"
                      className="tl-auth-inline-link"
                      onClick={() => {
                        setFeedback(null);
                        setValidationError('none');
                        setAuthView('forgot');
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="tl-auth-password-wrap">
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (validationError === 'incorrect_password') {
                          setValidationError('none');
                        }
                      }}
                      placeholder="•••••••••"
                      required
                      className={`with-toggle ${
                        validationError === 'incorrect_password' ? 'has-error' : ''
                      }`}
                    />
                    <button
                      type="button"
                      className="tl-auth-eye-btn"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {validationError === 'incorrect_password' && (
                    <p className="tl-auth-field-error">
                      Incorrect password. Please try again.
                    </p>
                  )}
                </div>

                {feedback && (
                  <div
                    role="status"
                    className={`tl-auth-feedback ${feedback.type}`}
                  >
                    {feedback.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="tl-auth-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in...' : 'Log In'}
                </button>
              </form>

              {validationError === 'incorrect_password' && (
                <div className="tl-auth-alert-banner">
                  <strong>The password you entered is incorrect.</strong>
                  <span>Please check your password and try again.</span>
                </div>
              )}

              {validationError === 'email_not_found' && (
                <div className="tl-auth-alert-banner">
                  <strong>No account was found for this email address.</strong>
                  <span>Try another email or create a new account.</span>
                </div>
              )}

              <div className="tl-auth-footer">
                {validationError === 'email_not_found' ? (
                  <button
                    type="button"
                    className="tl-auth-footer-link"
                    onClick={() => {
                      setFeedback(null);
                      setValidationError('none');
                      setAuthView('signup');
                    }}
                  >
                    Create an account →
                  </button>
                ) : (
                  <>
                    <span>Don&apos;t have an account?</span>
                    <button
                      type="button"
                      className="tl-auth-footer-link"
                      onClick={() => {
                        setFeedback(null);
                        setValidationError('none');
                        setAuthView('signup');
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </>
          )}

          {/* SIGN UP VIEW */}
          {authView === 'signup' && (
            <>
              <header className="tl-auth-header">
                <h2>Create account</h2>
                <p>Please sign up to continue</p>
              </header>

              <form onSubmit={handleSignUpSubmit} className="tl-auth-form">
                <div className="tl-auth-field">
                  <label htmlFor="signup-name">Full Name</label>
                  <input
                    id="signup-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Juan Dela Cruz"
                    required
                  />
                </div>

                <div className="tl-auth-field">
                  <label htmlFor="signup-email">Email Address</label>
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="tl-auth-field">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="•••••••••"
                    required
                  />
                </div>

                <div className="tl-auth-field">
                  <label htmlFor="signup-confirm">Confirm Password</label>
                  <input
                    id="signup-confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="•••••••••"
                    required
                  />
                </div>

                {feedback && (
                  <div
                    role="status"
                    className={`tl-auth-feedback ${feedback.type}`}
                  >
                    {feedback.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="tl-auth-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating account...' : 'Sign Up'}
                </button>
              </form>

              <div className="tl-auth-footer">
                <span>Already have an account?</span>
                <button
                  type="button"
                  className="tl-auth-footer-link"
                  onClick={() => {
                    setFeedback(null);
                    setAuthView('login');
                  }}
                >
                  Log In
                </button>
              </div>
            </>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {authView === 'forgot' && (
            <>
              <header className="tl-auth-header">
                <h2>Reset password</h2>
                <p>Enter your email address and we&apos;ll send a password reset link.</p>
              </header>

              <form onSubmit={handleForgotSubmit} className="tl-auth-form">
                <div className="tl-auth-field">
                  <label htmlFor="forgot-email">Email Address</label>
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {feedback && (
                  <div
                    role="status"
                    className={`tl-auth-feedback ${feedback.type}`}
                  >
                    {feedback.message}
                  </div>
                )}

                <button type="submit" className="tl-auth-submit-btn">
                  Send Reset Link
                </button>
              </form>

              <div className="tl-auth-footer">
                <span>Remembered your password?</span>
                <button
                  type="button"
                  className="tl-auth-footer-link"
                  onClick={() => {
                    setFeedback(null);
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