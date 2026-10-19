import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../api/client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name: string, domain?: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    const token = localStorage.getItem('phoenix_access_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const userData = await api.getCurrentUser();
      setUser(userData);
    } catch (err) {
      localStorage.removeItem('phoenix_access_token');
      localStorage.removeItem('phoenix_refresh_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, pass: string) => {
    const data = await api.login({ email, password: pass });
    localStorage.setItem('phoenix_access_token', data.tokens.access_token);
    localStorage.setItem('phoenix_refresh_token', data.tokens.refresh_token);
    setUser(data.user);
  };

  const register = async (email: string, pass: string, name: string, domain?: string) => {
    const data = await api.register({
      email,
      password: pass,
      full_name: name,
      target_domain: domain || 'IT'
    });
    localStorage.setItem('phoenix_access_token', data.tokens.access_token);
    localStorage.setItem('phoenix_refresh_token', data.tokens.refresh_token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('phoenix_access_token');
    localStorage.removeItem('phoenix_refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
