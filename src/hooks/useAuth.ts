import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { AuthState, User, LoginCredentials } from '../types';
import { API_URL } from '../config/constants';

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false, // Changed from true to false
    }),
    {
      name: 'auth-storage',
    }
  )
);

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
    return Promise.reject(error);
  }
);

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading } = useAuthStore();

  const login = async (credentials: LoginCredentials) => {
    try {
      const mockUsers = {
        'manager@example.com': {
          id: '1',
          name: 'John Manager',
          email: 'manager@example.com',
          role: 'manager',
          organizationId: 'org1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        'coach@example.com': {
          id: '2',
          name: 'Sarah Coach',
          email: 'coach@example.com',
          role: 'coach',
          organizationId: 'org1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        'entrepreneur@example.com': {
          id: '3',
          name: 'Alex Entrepreneur',
          email: 'entrepreneur@example.com',
          role: 'entrepreneur',
          organizationId: 'org1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
      
      if (!mockUsers[credentials.email as keyof typeof mockUsers]) {
        throw new Error('Invalid email or password');
      }
      
      if (!credentials.password) {
        throw new Error('Password is required');
      }
      
      const user = mockUsers[credentials.email as keyof typeof mockUsers];
      const token = 'mock-jwt-token';
      
      useAuthStore.setState({
        user: user as User,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
      
      return { user, token };
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const checkAuth = async () => {
    if (!token) {
      useAuthStore.setState({ isLoading: false });
      return;
    }

    try {
      useAuthStore.setState({ isLoading: false });
    } catch (error) {
      logout();
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };
};

export default useAuth;