import axios from 'axios';
import {
  AuthRequest,
  AuthResponse,
  JournalRequest,
  JournalResponse,
  ProfileRequest,
  ProfileResponse,
} from 'shared/types/api';

// Auth API
export async function login(data: AuthRequest): Promise<AuthResponse> {
  const res = await axios.post<AuthResponse>(
    'http://localhost:4000/auth',
    data
  );
  return res.data;
}

// Profile API
export async function getProfile(
  data: ProfileRequest
): Promise<ProfileResponse> {
  const res = await axios.get<ProfileResponse>(
    'http://localhost:4001/profile',
    { params: data }
  );
  return res.data;
}

// Journal API
export async function getJournal(
  data: JournalRequest
): Promise<JournalResponse> {
  const res = await axios.get<JournalResponse>(
    'http://localhost:4002/journal',
    { params: data }
  );
  return res.data;
}
