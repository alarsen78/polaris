import React, { useEffect, useState } from 'react';

import { useAuth } from '../AuthContext';
import { ProfileRequest } from 'shared/types/api';
import styles from './Welcome.module.css';
import { getProfile } from '../api/client';

const Welcome: React.FC = () => {
  const { userId, token, logout } = useAuth();
  const [fullName, setFullName] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        console.log('Loading profile for userId:', userId);
        const res = await getProfile({ userId, token } as ProfileRequest);
        setFullName(res.fullName);
      } catch {
        setError('Failed to load profile');
      }
    };

    if (userId && token) {
      loadProfile();
    }
  }, [userId, token]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!fullName) {
    return <p>Loading profile...</p>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.greeting}>Welcome, {fullName}!</div>
        <div className={styles.subtext}>
          <p>You&apos;re now logged in and ready to change your life!</p>
        </div>
        <div>
          <button className={styles.button} onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
