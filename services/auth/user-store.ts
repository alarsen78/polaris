import { Pool } from 'pg';
import argon2 from 'argon2';

type UserRecord = {
  userId: string;
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getUserId(
  email: string,
  password: string
): Promise<UserRecord | null> {
  const normalizedEmail = email.trim();

  try {
    const res = await pool.query(
      'SELECT user_id, password_hash FROM auth.users WHERE email = $1',
      [normalizedEmail]
    );

    if (res.rows.length === 0) return null;

    const row = res.rows[0] as { user_id: string; password_hash: string };

    const ok = await argon2.verify(row.password_hash, password);

    if (!ok) return null;

    return { userId: row.user_id } as UserRecord;
  } catch (error) {
    console.error('Error querying user:', error);
    return null;
  }
}
