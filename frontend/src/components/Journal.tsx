import React, { useEffect, useState } from 'react';

import { useAuth } from '../AuthContext';
import { JournalRequest, JournalEntry } from 'shared/types/api';
import styles from './Journal.module.css';
import { getJournal } from '../api/client';

const Journal: React.FC = () => {
  const { userId, token } = useAuth();
  const [error, setError] = useState('');
  const [journal, setJournal] = useState<JournalEntry[] | null>(null);

  useEffect(() => {
    const loadJournal = async () => {
      try {
        console.log('Loading journal for userId:', userId);
        const res = await getJournal({ userId, token } as JournalRequest);
        setJournal(res.journals);
      } catch {
        setError('Failed to load journal');
      }
    };

    if (userId && token) {
      loadJournal();
    }
  }, [userId, token]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!journal) {
    return <p>Loading journal...</p>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.greeting}>Journal entries</div>
        <ul className={styles.journalList}>
          {journal.map((entry) => (
            <li key={entry.id} className={styles.journalItem}>
              <div className={styles.journalContent}>{entry.content}</div>
              <div className={styles.journalDate}>
                {new Date(entry.date).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Journal;
