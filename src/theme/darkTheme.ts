import {colors} from './colors';
import {Theme} from './lightTheme';

export const darkTheme: Theme = {
  // Background colors
  background: {
    primary: colors.gray[900],
    secondary: colors.gray[800],
    tertiary: colors.gray[700],
    elevated: colors.gray[800],
    overlay: 'rgba(0, 0, 0, 0.7)',
  },

  // Surface colors
  surface: {
    primary: colors.gray[800],
    secondary: colors.gray[700],
    tertiary: colors.gray[600],
  },

  // Text colors
  text: {
    primary: colors.gray[50],
    secondary: colors.gray[300],
    tertiary: colors.gray[400],
    disabled: colors.gray[600],
    inverse: colors.gray[900],
    link: colors.primary[400],
  },

  // Border colors
  border: {
    primary: colors.gray[700],
    secondary: colors.gray[600],
    focus: colors.primary[500],
    error: colors.error.main,
  },

  // Icon colors
  icon: {
    primary: colors.gray[200],
    secondary: colors.gray[400],
    tertiary: colors.gray[500],
    inverse: colors.gray[900],
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
    background: colors.gray[800],
    border: colors.gray[600],
    placeholder: colors.gray[500],
    text: colors.gray[50],
    focus: colors.primary[500],
    disabled: colors.gray[700],
  },

  // Button colors
  button: {
    primary: {
      background: colors.primary[500],
      text: colors.white,
      border: colors.primary[500],
    },
    secondary: {
      background: colors.gray[700],
      text: colors.gray[50],
      border: colors.gray[600],
    },
    ghost: {
      background: 'transparent',
      text: colors.primary[400],
      border: 'transparent',
    },
  },

  // Tab bar colors
  tabBar: {
    background: colors.gray[900],
    border: colors.gray[800],
    active: colors.primary[500],
    inactive: colors.gray[500],
  },
};
