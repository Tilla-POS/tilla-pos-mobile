import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lightTheme, darkTheme, Theme} from '../theme';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  isDark: boolean;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme_mode';

const getSystemTheme = (): 'light' | 'dark' => {
  const colorScheme: ColorSchemeName = Appearance.getColorScheme();
  return colorScheme === 'dark' ? 'dark' : 'light';
};

const getThemeFromMode = (mode: ThemeMode): Theme => {
  if (mode === 'system') {
    return getSystemTheme() === 'dark' ? darkTheme : lightTheme;
  }
  return mode === 'dark' ? darkTheme : lightTheme;
};

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [theme, setThemeState] = useState<Theme>(getThemeFromMode('system'));
  const [isDark, setIsDark] = useState<boolean>(getSystemTheme() === 'dark');

  // Load saved theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
          const themeMode = savedMode as ThemeMode;
          setMode(themeMode);
          setThemeState(getThemeFromMode(themeMode));
          setIsDark(
            themeMode === 'dark' ||
              (themeMode === 'system' && getSystemTheme() === 'dark'),
          );
        }
      } catch (error) {
        console.log('Error loading theme:', error);
      }
    };

    loadTheme();
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      if (mode === 'system') {
        const systemTheme = colorScheme === 'dark' ? darkTheme : lightTheme;
        setThemeState(systemTheme);
        setIsDark(colorScheme === 'dark');
      }
    });

    return () => {
      subscription?.remove();
    };
  }, [mode]);

  const setTheme = useCallback(async (newMode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode);
      setMode(newMode);
      const newTheme = getThemeFromMode(newMode);
      setThemeState(newTheme);
      setIsDark(
        newMode === 'dark' ||
          (newMode === 'system' && getSystemTheme() === 'dark'),
      );
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    let newMode: ThemeMode;

    if (mode === 'light') {
      newMode = 'dark';
    } else if (mode === 'dark') {
      newMode = 'system';
    } else {
      newMode = 'light';
    }

    setTheme(newMode);
  }, [mode, setTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode,
        isDark,
        setTheme,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
