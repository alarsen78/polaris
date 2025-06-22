// frontend/src/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

// frontend/src/AuthContext.tsx
import { AuthRequest, AuthResponse } from 'shared/types/api';
import { login as apiLogin } from './api/client';

type AuthContextType = {
  token: string | null;
  userId: string | null;
  login: (username: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('authToken')
  );
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem('userId')
  );

  const login = async (
    username: string,
    password: string
  ): Promise<AuthResponse> => {
    console.log('Logging in with:', username);

    const authRequest: AuthRequest = {
      username,
      password,
    };

    const data: AuthResponse = await apiLogin(authRequest);

    const { userId, token } = data;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);
    setToken(token);
    setUserId(userId);

    return data;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
