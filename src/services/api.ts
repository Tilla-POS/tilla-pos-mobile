import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Config} from '../config/env.config';
import {AuthResponse} from './authService';

export interface ApiResponse<T> {
  apiVersion: string;
  data: T;
  timestamp: string;
  statusCode: number;
  message: string;
  path: string;
}

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
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
