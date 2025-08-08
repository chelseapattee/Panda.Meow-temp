import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        {error && <div className="admin-login__error">{error}</div>}
      </form>
    </div>
  );
};

export default AdminLogin; 