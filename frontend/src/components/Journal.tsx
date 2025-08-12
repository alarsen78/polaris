import React, { useEffect, useState } from 'react';

import { useAuth } from '../AuthContext';
import { JournalRequest, JournalEntry } from 'shared/types/api';
import styles from './Journal.module.css';
import { getJournal, addJournalEntry } from '../api/client';

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
        <div>
          <h1 className={styles.title}>Your Journal</h1>
          <p className={styles.description}>
            Here you can view your journal entries and add more.
          </p>
        </div>
        <div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const textarea = form.elements.namedItem(
                'entry'
              ) as HTMLTextAreaElement;
              const content = textarea.value.trim();
              if (!content) return;

              await addJournalEntry({
                request: { userId, token },
                entry: {
                  id: '',
                  date: new Date().toISOString(),
                  content,
                },
              });

              textarea.value = '';

              // Reload journal after successful submission
              try {
                const res = await getJournal({
                  userId,
                  token,
                } as JournalRequest);
                setJournal(res.journals);
              } catch {
                setError('Failed to reload journal');
              }
            }}
            className={styles.form}
          >
            <textarea
              name="entry"
              placeholder="Write your journal entry..."
              className={styles.textarea}
              rows={8}
            />
            <button type="submit" className={styles.button}>
              Add Entry
            </button>
          </form>
        </div>
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
