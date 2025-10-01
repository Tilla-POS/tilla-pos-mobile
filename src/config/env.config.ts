import {
  API_BASE_URL,
  API_TIMEOUT,
  NODE_ENV,
  APP_ENV,
  ENABLE_LOGGING,
  ENABLE_ANALYTICS,
  APP_NAME,
  APP_VERSION,
} from '@env';

export const Config = {
  API: {
    BASE_URL: API_BASE_URL || 'https://api.tillapos.dev',
    TIMEOUT: parseInt(API_TIMEOUT || '10000', 10),
  },
  APP: {
    NAME: APP_NAME || 'TillaPos',
    VERSION: APP_VERSION || '0.0.1',
    ENVIRONMENT: APP_ENV || 'development',
  },
  FEATURES: {
    LOGGING: ENABLE_LOGGING === 'true',
    ANALYTICS: ENABLE_ANALYTICS === 'true',
  },
  IS_DEV: NODE_ENV === 'development',
  IS_PROD: NODE_ENV === 'production',
} as const;

export type ConfigType = typeof Config;
