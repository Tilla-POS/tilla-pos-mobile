import AsyncStorage from '@react-native-async-storage/async-storage';
import api, {ApiResponse} from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface Business {
  id: string;
  name: string;
  currency: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isActive: true;
}

export interface User {
  id: string;
  username: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  business: Business | null;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export const authService = {
  login: async (
    credentials: LoginCredentials,
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/sign-in',
      credentials,
    );
    const {data} = response.data;

    await AsyncStorage.setItem('accessToken', data.accessToken);
    await AsyncStorage.setItem('refreshToken', data.refreshToken);
    await AsyncStorage.setItem('tokenType', data.tokenType);
    await AsyncStorage.setItem('expiresIn', data.expiresIn.toString());

    return response.data;
  },

  register: async (
    credentials: RegisterCredentials,
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/signup',
      credentials,
    );
    const {data} = response.data;

    await AsyncStorage.setItem('accessToken', data.accessToken);
    await AsyncStorage.setItem('refreshToken', data.refreshToken);
    await AsyncStorage.setItem('tokenType', data.tokenType);
    await AsyncStorage.setItem('expiresIn', data.expiresIn.toString());

    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
    }
  },

  getCurrentUser: async (): Promise<User | null> => {
    const response = await api.get('/users/me');
    return response.data;
  },

  getAccessToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem('accessToken');
  },
};
