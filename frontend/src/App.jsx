import { useState } from 'react';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';

export default function App() {
  const [userSession, setUserSession] = useState(null);

  return (
    <div>
      {!userSession ? (
        <Login onAuthSuccess={(user) => setUserSession(user)} />
      ) : (
        <Dashboard user={userSession} onLogout={() => setUserSession(null)} />
      )}
    </div>
  );
}