import AsyncStorage from '@react-native-async-storage/async-storage';
import api, {ApiResponse} from './api';
import {deviceInfoService} from './deviceInfoService';
import {locationService} from './locationService';
import {User} from './userService';
import {Business} from './businessService';
import { BaseDevice } from './devicesService';
import { FileData } from '../lib/interfaces/FileData';

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
  username: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface NeedOTPResponse {
  needsOtp: boolean;
}

export interface CreateBusinessCredentials {
  name: string;
  slug: string;
  currency: string;
  email: string;
  shopkeeperId: string;
  businessTypeId: string;
  logo?: FileData;
}

export interface VerifyOTPCredentials {
  code: string;
  email: string;
}

export const authService = {
  login: async (
    credentials: LoginCredentials,
  ): Promise<ApiResponse<AuthResponse | NeedOTPResponse>> => {
    // Get device info
    const deviceInfo = await deviceInfoService.getDeviceInfo();

    // Get location (try GPS first, fallback to IP)
    let locationInfo = await locationService.getCompleteLocation();

    const device: BaseDevice = {
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

    const response = await api.post<ApiResponse<AuthResponse | NeedOTPResponse>>(
      '/auth/sign-in',
      {...credentials, device, location},
    );
    const {data} = response.data;
    if (data instanceof Object && 'accessToken' in data) {
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
    }

    return response.data;
  },

  register: async (
    credentials: RegisterCredentials,
  ): Promise<ApiResponse<User>> => {
    console.log('authService.register: Registering user with', credentials);
    const response = await api.post<ApiResponse<User>>(
      '/auth/signup',
      credentials,
    );
    console.log('authService.register: Registration response:', response.data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    }
  },

  createBusiness: async (
    credentials: CreateBusinessCredentials,
  ): Promise<ApiResponse<Business>> => {
    const formData = new FormData();
    formData.append('name', credentials.name);
    formData.append('slug', credentials.slug);
    formData.append('currency', credentials.currency);
    formData.append('email', credentials.email);
    formData.append('shopkeeperId', credentials.shopkeeperId);
    formData.append('businessTypeId', credentials.businessTypeId);
    if (credentials.logo) {
      formData.append('image', {
        uri: credentials.logo.uri,
        name: credentials.logo.name,
        type: credentials.logo.type,
      } as any);
    }
    console.log('authService.createBusiness: Creating business with', credentials);
    const response = await api.post<ApiResponse<Business>>(
      'auth/create-business',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log('authService.createBusiness: Create business response:', response.data);
    return response.data;
  },

  getAccessToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem('accessToken');
  },

  verifyOTP: async (
    credentials: VerifyOTPCredentials,
  ): Promise<ApiResponse<AuthResponse>> => {
    // Get device info
    const deviceInfo = await deviceInfoService.getDeviceInfo();

    // Get location (try GPS first, fallback to IP)
    let locationInfo = await locationService.getCompleteLocation();

    const device: BaseDevice = {
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
    console.log('authService.verifyOTP: Verifying OTP with', credentials);
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/otp-verify',
      {...credentials, device, location},
    );
    const {data} = response.data;
    console.log('authService.verifyOTP: Store accessToken and refreshToken', response.data);
    await AsyncStorage.setItem('accessToken', data.accessToken);
    await AsyncStorage.setItem('refreshToken', data.refreshToken);
    await AsyncStorage.setItem('tokenType', data.tokenType);
    await AsyncStorage.setItem('expiresIn', data.expiresIn.toString());
    console.log('authService.verifyOTP: OTP verification response:', response.data);
    return response.data;
  },

  resendOTP: async (data: {
    email: string;
  }): Promise<ApiResponse<{sent: boolean; message: string}>> => {
    const response = await api.post<
      ApiResponse<{sent: boolean; message: string}>
    >('/auth/resend-otp', data);
    return response.data;
  },
};
