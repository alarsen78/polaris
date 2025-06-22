import axios from 'axios';
import {
  AuthRequest,
  AuthResponse,
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
  const res = await axios.post<ProfileResponse>(
    'http://localhost:4001/profile',
    data
  );
  return res.data;
}
