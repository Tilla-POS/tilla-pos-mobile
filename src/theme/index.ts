import {typography} from './typography';
import {spacing} from './spacing';
import {breakpoints} from './breakpoints';
import {shadows} from './shadows';
import {radius} from './radius';
import {lightTheme} from './lightTheme';
import {darkTheme} from './darkTheme';

export const theme = {
  light: lightTheme,
  dark: darkTheme,
  typography,
  spacing,
  breakpoints,
  shadows,
  radius,
};

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './breakpoints';
export * from './shadows';
export * from './radius';
export * from './lightTheme';
export * from './darkTheme';
