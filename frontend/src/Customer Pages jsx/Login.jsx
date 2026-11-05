import { useState } from 'react';
import '../Customer Pages Styling/Login.css';

export default function Login() {
  const [authView, setAuthView] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [email, setEmail] = useState('peachy@email.com');
  const [password, setPassword] = useState('•••••••••');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation state: 'none' | 'incorrect_password' | 'email_not_found'
  const [validationError, setValidationError] = useState('none');
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = (e) => {
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
        text: `Account created for ${fullName || email}. Please login to your account.`
      });
      setAuthView('login');
      return;
    }

    // Role-based Access Control handled by backend
    if (email === 'wrong-email@example.com') {
      setValidationError('email_not_found');
      return;
    }

    if (password === 'wrongpassword') {
      setValidationError('incorrect_password');
      return;
    }

    setValidationError('none');
    setStatusMessage({
      type: 'success',
      text: `Logged in successfully as ${email}. Role will be resolved by backend.`
    });
  };

  let loginSubtitle = 'Please login to your account';
  if (validationError === 'incorrect_password') {
    loginSubtitle = "We couldn't sign you in with those credentials.";
  } else if (validationError === 'email_not_found') {
    loginSubtitle = "We couldn't find an account with that email.";
  }

  return (
    <div className="tindalink-auth-layout">
      {/* Left Brand Panel: Centered Logo with TindaLink Title directly below */}
      <aside className="tindalink-brand-panel">
        <div className="tindalink-brand-centered">
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

          {/* TindaLink Title Positioned Directly Below Logo */}
          <h1 className="tindalink-brand-title">
            Tinda<span className="tindalink-brand-highlight">Link</span>
          </h1>

          {/* System subtitle underneath title */}
          <p className="tindalink-brand-subtitle">Smart access. Secure and simple.</p>
          <p className="tindalink-brand-tagline">
            TindaLink keeps your sign-in and account creation experience clear and consistent.
          </p>
        </div>
      </aside>

      {/* Right Form Panel */}
      <main className="tindalink-form-panel">
        <section className="tindalink-auth-card" aria-label="Authentication">
          {/* LOGIN PAGE */}
          {authView === 'login' && (
            <>
              <header className="tindalink-card-header">
                <h2>Welcome back</h2>
                <p>{loginSubtitle}</p>
              </header>

              <form className="tindalink-form" onSubmit={handleSubmit}>
                {/* Email Address with Label Above Input */}
                <div className="tindalink-form-group">
                  <label htmlFor="email" className="tindalink-field-label">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (validationError === 'email_not_found') setValidationError('none');
                    }}
                    className={validationError === 'email_not_found' ? 'has-error' : ''}
                    required
                  />
                  {validationError === 'email_not_found' && (
                    <p className="tindalink-inline-error">
                      Email address not found. Please check the email.
                    </p>
                  )}
                </div>

                {/* Password with Label Above Input */}
                <div className="tindalink-form-group">
                  <div className="tindalink-label-row">
                    <label htmlFor="password" className="tindalink-field-label" style={{ marginBottom: 0 }}>
                      Password
                    </label>
                    <button
                      type="button"
                      className="tindalink-link-btn"
                      onClick={() => {
                        setStatusMessage(null);
                        setValidationError('none');
                        setAuthView('forgot');
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="•••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (validationError === 'incorrect_password') setValidationError('none');
                    }}
                    className={validationError === 'incorrect_password' ? 'has-error' : ''}
                    required
                  />
                  {validationError === 'incorrect_password' && (
                    <p className="tindalink-inline-error">
                      Incorrect password. Please try again.
                    </p>
                  )}
                </div>

                {statusMessage && (
                  <div className={`tindalink-alert ${statusMessage.type}`}>
                    {statusMessage.text}
                  </div>
                )}

                {/* Submit Button (Full Width) */}
                <div style={{ marginTop: '8px' }}>
                  <button type="submit" className="tindalink-submit-btn">
                    Log In
                  </button>
                </div>
              </form>

              {/* Validation alert banners */}
              {validationError === 'incorrect_password' && (
                <div className="tindalink-val-alert">
                  <strong>The password you entered is incorrect.</strong>
                  <p>Please check your password and try again.</p>
                </div>
              )}

              {validationError === 'email_not_found' && (
                <div className="tindalink-val-alert">
                  <strong>No account was found for this email address.</strong>
                  <p>Try another email or create a new account.</p>
                </div>
              )}

              <div className="tindalink-signup-prompt">
                {validationError === 'email_not_found' ? (
                  <button
                    type="button"
                    className="tindalink-link-btn"
                    onClick={() => {
                      setStatusMessage(null);
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
                      className="tindalink-link-btn"
                      onClick={() => {
                        setStatusMessage(null);
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

          {/* SIGN UP PAGE */}
          {authView === 'signup' && (
            <>
              <header className="tindalink-card-header">
                <h2>Create account</h2>
                <p>Please sign up to continue</p>
              </header>

              <form className="tindalink-form" onSubmit={handleSubmit}>
                <div className="tindalink-form-group">
                  <label htmlFor="fullName" className="tindalink-field-label">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Juan Dela Cruz"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="tindalink-form-group">
                  <label htmlFor="signupEmail" className="tindalink-field-label">
                    Email Address
                  </label>
                  <input
                    id="signupEmail"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="tindalink-form-group">
                  <label htmlFor="signupPassword" className="tindalink-field-label">
                    Password
                  </label>
                  <input
                    id="signupPassword"
                    type="password"
                    placeholder="•••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="tindalink-form-group">
                  <label htmlFor="confirmPassword" className="tindalink-field-label">
                    Confirm Password
                  </label>
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

                <div style={{ marginTop: '8px' }}>
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
                    setStatusMessage(null);
                    setAuthView('login');
                  }}
                >
                  Log In
                </button>
              </div>
            </>
          )}

          {/* FORGOT PASSWORD PAGE */}
          {authView === 'forgot' && (
            <>
              <header className="tindalink-card-header">
                <h2>Reset password</h2>
                <p>Enter your email address and we will send a recovery link.</p>
              </header>

              <form className="tindalink-form" onSubmit={handleSubmit}>
                <div className="tindalink-form-group">
                  <label htmlFor="resetEmail" className="tindalink-field-label">
                    Email Address
                  </label>
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

                <div style={{ marginTop: '8px' }}>
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