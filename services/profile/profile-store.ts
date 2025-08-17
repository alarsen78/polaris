// user-store.ts

type UserProfileRecord = {
  fullName: string;
};

export const userProfileMap: Map<string, UserProfileRecord> = new Map([
  ['221e6381-89b0-4d71-ad3d-17980a2f0cdf', { fullName: 'Anders Larsen' }],
  ['1d6f3f94-9c18-4b85-bdcd-1a2d0f9e4321', { fullName: 'Alice Anderson' }],
  ['2b1a7f14-4c3b-4329-8184-77e9b95a7b33', { fullName: 'Bob Alison' }],
  ['3e4e1836-24c4-4e2f-b7a7-d6810f5be5de', { fullName: 'Charlie Bobson' }],
]);
