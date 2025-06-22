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
