import { JournalEntry } from 'shared/types/api';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getEntriesByUser(
  userId: string
): Promise<JournalEntry[] | null> {
  try {
    const res = await pool.query(
      'SELECT entry_id, content, updated_at FROM journal.entry WHERE user_id = $1',
      [userId]
    );

    if (res.rows.length === 0) return null;

    return res.rows.map((row) => ({
      id: row.entry_id,
      date: row.updated_at,
      content: row.content,
    })) as JournalEntry[];
  } catch (error) {
    console.error('Error querying user profile:', error);
    return null;
  }
}

export async function addEntry(
  userId: string,
  entry: JournalEntry
): Promise<void> {
  try {
    await pool.query(
      'INSERT INTO journal.entry (user_id, content) VALUES ($1, $2)',
      [userId, entry.content]
    );
  } catch (error) {
    console.error('Error adding journal entry:', error);
    throw error;
  }
}
