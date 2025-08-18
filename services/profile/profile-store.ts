// user-store.ts
import { Pool } from 'pg';

type UserProfileRecord = {
  profileId: string;
  fullName: string;
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getUserProfile(
  userId: string
): Promise<UserProfileRecord | null> {
  try {
    const res = await pool.query(
      'SELECT profile_id, full_name FROM profile.profile WHERE user_id = $1',
      [userId]
    );

    if (res.rows.length === 0) return null;

    const row = res.rows[0] as { profile_id: string; full_name: string };

    return {
      profileId: row.profile_id,
      fullName: row.full_name,
    } as UserProfileRecord;
  } catch (error) {
    console.error('Error querying user profile:', error);
    return null;
  }
}
