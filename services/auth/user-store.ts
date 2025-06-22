// user-store.ts

type UserRecord = {
  userId: string;
  password: string;
};

export const userMap: Map<string, UserRecord> = new Map([
  [
    'larand78@gmail.com',
    { userId: '65b612d6-099c-4ec5-ba55-cb5cff969470', password: 'admin' },
  ],
  [
    'alice@example.com',
    { userId: '1d6f3f94-9c18-4b85-bdcd-1a2d0f9e4321', password: 'password123' },
  ],
  [
    'bob@example.com',
    { userId: '2b1a7f14-4c3b-4329-8184-77e9b95a7b33', password: 'password123' },
  ],
  [
    'charlie@example.com',
    { userId: '3e4e1836-24c4-4e2f-b7a7-d6810f5be5de', password: 'password123' },
  ],
]);
