// shared/types/api.ts

export type AuthRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  userId: string;
  token: string;
};

export type ProfileRequest = {
  userId: string;
  token: string;
};

export type ProfileResponse = {
  fullName: string;
};

export type JournalRequest = {
  userId: string;
  token: string;
};

export type JournalEntry = {
  id: string;
  date: string;
  content: string;
};

export type JournalResponse = {
  journals: JournalEntry[];
};
