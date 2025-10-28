/**
 * Gathers user's device information
 * using react-native-device-info library
 */

import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

export interface DeviceInformation {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  brand: string;
  model: string;
  systemName: string;
  systemVersion: string;
  appVersion: string;
  isEmulator: boolean;
  isTablet: boolean;
  userAgent: string;
}

export const deviceInfoService = {
  getDeviceInfo: async (): Promise<DeviceInformation> => {
    try {
      const [
        deviceId,
        deviceName,
        brand,
        model,
        systemVersion,
        appVersion,
        isEmulator,
        isTablet,
        userAgent,
      ] = await Promise.all([
        DeviceInfo.getUniqueId(),
        DeviceInfo.getDeviceName(),
        DeviceInfo.getBrand(),
        DeviceInfo.getModel(),
        DeviceInfo.getSystemVersion(),
        DeviceInfo.getVersion(),
        DeviceInfo.isEmulator(),
        DeviceInfo.isTablet(),
        DeviceInfo.getUserAgent(),
      ]);

      return {
        deviceId,
        deviceName,
        deviceType: Platform.OS,
        brand,
        model,
        systemName: Platform.OS === 'ios' ? 'iOS' : 'Android',
        systemVersion,
        appVersion,
        isEmulator,
        isTablet,
        userAgent,
      };
    } catch (error) {
      console.error('Error getting device info:', error);
      throw error;
    }
  },

  // Get simple device fingerprint
  getDeviceFingerprint: async (): Promise<string> => {
    const deviceInfo = await deviceInfoService.getDeviceInfo();
    return `${deviceInfo.deviceId}-${deviceInfo.brand}-${deviceInfo.model}`;
  },
};
