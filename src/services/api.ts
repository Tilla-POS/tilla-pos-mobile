import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Config} from '../config/env.config';
import {AuthResponse} from './authService';
import {QueryClient} from '@tanstack/react-query';

export interface ApiResponse<T> {
  apiVersion: string;
  data: T;
  timestamp: string;
  statusCode: number;
  message: string;
  path: string;
}

// Global query client reference for token invalidation
let queryClientRef: QueryClient | null = null;

export const setQueryClientRef = (client: QueryClient) => {
  queryClientRef = client;
};

const api = axios.create({
  baseURL: Config.API.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  response => {
    console.log('API Response:', response);
    return response;
  },
  async error => {
    const originalRequest = error.config;
    console.log('API Error Response:', error.response);
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        if (!refreshToken) {
          // No refresh token available, clear auth state
          console.log('No refresh token available, logging out');
          await handleAuthFailure();
          return Promise.reject(error);
        }

        const response = await axios.post<ApiResponse<AuthResponse>>(
          `${Config.API.BASE_URL}/auth/refresh`,
          {
            refreshToken,
          },
        );

        const {data} = response.data;
        console.log('API Refresh Token Response:', data);
        await AsyncStorage.setItem('accessToken', data.accessToken);
        await AsyncStorage.setItem('refreshToken', data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        // Refresh token is expired or invalid
        console.log('Token refresh failed:', err);
        await handleAuthFailure();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

// Handle authentication failure by clearing tokens and cache
const handleAuthFailure = async () => {
  await AsyncStorage.multiRemove([
    'accessToken',
    'refreshToken',
    'tokenType',
    'expiresIn',
  ]);

  // Invalidate the query cache to trigger navigation to LoginScreen
  if (queryClientRef) {
    queryClientRef.setQueryData(['CURRENT_TOKEN'], null);
    queryClientRef.clear();
  }
};

export default api;
