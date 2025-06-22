import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import styles from './Login.module.css';

const Login: React.FC = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);

      setError('');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleLogin} className={styles.button}>
        Login
      </button>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Login;
