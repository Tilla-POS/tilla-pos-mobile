import {colors} from './colors';

export const lightTheme = {
  // Background colors
  background: {
    primary: colors.white,
    secondary: colors.gray[50],
    tertiary: colors.gray[100],
    elevated: colors.white,
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Surface colors (for cards, modals, etc)
  surface: {
    primary: colors.white,
    secondary: colors.gray[50],
    tertiary: colors.gray[100],
  },

  // Text colors
  text: {
    primary: colors.gray[900],
    secondary: colors.gray[600],
    tertiary: colors.gray[500],
    disabled: colors.gray[400],
    inverse: colors.white,
    link: colors.primary[600],
  },

  // Border colors
  border: {
    primary: colors.gray[200],
    secondary: colors.gray[300],
    focus: colors.primary[500],
    error: colors.error.main,
  },

  // Icon colors
  icon: {
    primary: colors.gray[700],
    secondary: colors.gray[500],
    tertiary: colors.gray[400],
    inverse: colors.white,
  },

  // Primary color variants
  primary: {
    main: colors.primary[500],
    light: colors.primary[400],
    dark: colors.primary[600],
    contrast: colors.white,
  },

  // Secondary color variants
  secondary: {
    main: colors.secondary[500],
    light: colors.secondary[400],
    dark: colors.secondary[600],
    contrast: colors.white,
  },

  // Status colors
  success: colors.success,
  error: colors.error,
  warning: colors.warning,
  info: colors.info,

  // Input colors
  input: {
    background: colors.gray[50],
    border: colors.gray[300],
    placeholder: colors.gray[400],
    text: colors.gray[900],
    focus: colors.primary[500],
    disabled: colors.gray[100],
  },

  // Button colors
  button: {
    primary: {
      background: colors.primary[500],
      text: colors.white,
      border: colors.primary[500],
    },
    secondary: {
      background: colors.gray[100],
      text: colors.gray[900],
      border: colors.gray[300],
    },
    ghost: {
      background: 'transparent',
      text: colors.primary[600],
      border: 'transparent',
    },
  },

  // Tab bar colors
  tabBar: {
    background: colors.white,
    border: colors.gray[200],
    active: colors.primary[500],
    inactive: colors.gray[500],
  },
};

export type Theme = typeof lightTheme;
