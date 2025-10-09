import AsyncStorage from '@react-native-async-storage/async-storage';
import api, {ApiResponse} from './api';
import {deviceInfoService} from './deviceInfoService';
import {locationService} from './locationService';

export interface Device {
  name: string;
  type: string;
  brand: string;
  model: string;
  deviceId: string;
  appVersion: string;
  isEmulator: boolean;
  isTablet: boolean;
  systemName: string;
  systemVersion: string;
  userAgent: string;
  trusted: boolean;
}

export interface Location {
  country: string;
  region: string;
  city: string;
  postalCode: string;
  countryCode: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
}
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
    // Get device info
    const deviceInfo = await deviceInfoService.getDeviceInfo();

    // Get location (try GPS first, fallback to IP)
    let locationInfo = await locationService.getCompleteLocation();

    const device: Device = {
      name: deviceInfo.deviceName || 'Unknown',
      type: deviceInfo.deviceType,
      brand: deviceInfo.brand,
      model: deviceInfo.model,
      deviceId: deviceInfo.deviceId,
      appVersion: deviceInfo.appVersion,
      isEmulator: deviceInfo.isEmulator,
      isTablet: deviceInfo.isTablet,
      systemName: deviceInfo.systemName,
      systemVersion: deviceInfo.systemVersion,
      userAgent: deviceInfo.userAgent,
      trusted: true, // For simplicity, mark all as trusted
    };

    let location: Location | null = null;
    if (locationInfo) {
      location = {
        country: locationInfo.address
          ? locationInfo.address.country || 'Unknown'
          : 'Unknown',
        region: locationInfo.address
          ? locationInfo.address.region || 'Unknown'
          : 'Unknown',
        city: locationInfo.address
          ? locationInfo.address.city || 'Unknown'
          : 'Unknown',
        postalCode: locationInfo.address
          ? locationInfo.address.postalCode || 'Unknown'
          : 'Unknown',
        countryCode: locationInfo.address
          ? locationInfo.address.countryCode || 'XX'
          : 'XX',
        formattedAddress: locationInfo.address
          ? locationInfo.address.formattedAddress || 'Unknown'
          : 'Unknown',
        latitude: locationInfo.latitude || 0,
        longitude: locationInfo.longitude || 0,
      };
    }

    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/sign-in',
      {...credentials, device, location},
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
