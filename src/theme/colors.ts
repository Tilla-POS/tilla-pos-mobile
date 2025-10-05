export const colors = {
  // Primary Brand Color
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#617AFA', // Main primary color
    600: '#4F5FD9',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },

  // Secondary Colors
  secondary: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },

  // Accent Colors
  accent: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },

  // Status Colors
  success: {
    light: '#10B981',
    main: '#059669',
    dark: '#047857',
  },
  error: {
    light: '#EF4444',
    main: '#DC2626',
    dark: '#B91C1C',
  },
  warning: {
    light: '#F59E0B',
    main: '#D97706',
    dark: '#B45309',
  },
  info: {
    light: '#3B82F6',
    main: '#2563EB',
    dark: '#1D4ED8',
  },

  // Neutral/Gray Scale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Special Colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export type ColorPalette = typeof colors;
