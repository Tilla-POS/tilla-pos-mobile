/**
 * Fetch all the authenticated user's devices from the backend API
 */

import api, {ApiResponse} from './api';

export interface BaseDevice {
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
  id: string;
  country: string;
  region: string;
  city: string;
  postalCode: string;
  countryCode: string;
  formattedAddress: string;
  latitude: string;
  longitude: string;
  createdAt: string;
}

export interface Device extends BaseDevice {
  id: string;
  createdAt: string;
  updatedAt: string;
  locations: Location[];
  isCurrentDevice: boolean;
  lastActivityAt: string | null;
}

export interface DevicesResponse {
  currentDevice: Device;
  activeDevices: Device[];
  inactiveDevices: Device[];
}

export const devicesService = {
  fetchUserDevices: async (): Promise<DevicesResponse> => {
    const response = await api.get<ApiResponse<DevicesResponse>>(
      '/session/devices',
    );
    return response.data.data;
  },
};
