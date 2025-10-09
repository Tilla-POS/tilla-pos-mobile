import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';
import axios from 'axios';

export interface LocationInfo {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
  timestamp: number;
  address?: LocationAddress;
}

export interface LocationAddress {
  country?: string;
  countryCode?: string;
  region?: string;
  city?: string;
  postalCode?: string;
  street?: string;
  formattedAddress?: string;
}

export interface IPLocationInfo {
  ip: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp?: string;
}

export const locationService = {
  // Request location permissions
  requestLocationPermission: async (): Promise<boolean> => {
    if (Platform.OS === 'ios') {
      return true; // iOS handles permissions automatically
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location for security purposes.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Location permission error:', err);
      return false;
    }
  },

  // Get current GPS location
  getCurrentLocation: (): Promise<LocationInfo> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const locationInfo: LocationInfo = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude || undefined,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          };
          resolve(locationInfo);
        },
        error => {
          console.error('Geolocation error:', error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    });
  },

  // Get location with permission check
  getLocationWithPermission: async (): Promise<LocationInfo | null> => {
    const hasPermission = await locationService.requestLocationPermission();

    if (!hasPermission) {
      console.log('Location permission denied');
      return null;
    }

    try {
      return await locationService.getCurrentLocation();
    } catch (error) {
      console.error('Failed to get location:', error);
      return null;
    }
  },

  // Get location from IP (fallback method)
  getLocationFromIP: async (): Promise<IPLocationInfo | null> => {
    try {
      // Using ip-api.com (free, no API key needed)
      const response = await axios.get(
        'http://ip-api.com/json/?fields=status,message,country,countryCode,region,city,lat,lon,timezone,isp,query',
      );

      if (response.data.status === 'success') {
        return {
          ip: response.data.query,
          country: response.data.country,
          countryCode: response.data.countryCode,
          region: response.data.region,
          city: response.data.city,
          latitude: response.data.lat,
          longitude: response.data.lon,
          timezone: response.data.timezone,
          isp: response.data.isp,
        };
      }

      return null;
    } catch (error) {
      console.error('Error getting IP location:', error);
      return null;
    }
  },

  // Reverse geocoding (coordinates to address)
  reverseGeocode: async (
    latitude: number,
    longitude: number,
  ): Promise<LocationAddress | null> => {
    try {
      // Using Nominatim (OpenStreetMap) - free, no API key
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'YourAppName/1.0', // Required by Nominatim
          },
        },
      );

      if (response.data && response.data.address) {
        const addr = response.data.address;
        return {
          country: addr.country,
          countryCode: addr.country_code?.toUpperCase(),
          region: addr.state || addr.region,
          city: addr.city || addr.town || addr.village,
          postalCode: addr.postcode,
          street: addr.road,
          formattedAddress: response.data.display_name,
        };
      }

      return null;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return null;
    }
  },

  // Get complete location info (GPS + Address)
  getCompleteLocation: async (): Promise<LocationInfo | null> => {
    try {
      const location = await locationService.getLocationWithPermission();

      if (!location) {
        return null;
      }

      // Try to get address
      const address = await locationService.reverseGeocode(
        location.latitude,
        location.longitude,
      );

      return {
        ...location,
        address: address || undefined,
      };
    } catch (error) {
      console.error('Error getting complete location:', error);
      return null;
    }
  },
};
