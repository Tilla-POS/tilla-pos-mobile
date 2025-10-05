import {useThemeContext} from '../context/ThemeContext';
import {typography, spacing, breakpoints, shadows, radius} from '../theme';

export const useTheme = () => {
  const {theme, mode, isDark, setTheme, toggleTheme} = useThemeContext();

  return {
    theme,
    mode,
    isDark,
    setTheme,
    toggleTheme,
    typography,
    spacing,
    breakpoints,
    shadows,
    radius,
  };
};
