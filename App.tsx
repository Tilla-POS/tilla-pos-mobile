import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useTheme} from './src/hooks/useTheme';
import RootNavigator from './src/navigation/RootNavigator';
import {ThemeProvider} from './src/context/ThemeContext';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {setQueryClientRef} from './src/services/api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Set the query client reference for API interceptor
setQueryClientRef(queryClient);

function AppContent() {
  const {theme, isDark, typography} = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          primary: theme.primary.main,
          background: theme.background.primary,
          card: theme.background.primary,
          text: theme.text.primary,
          border: theme.border.primary,
          notification: theme.error.main,
        },
        fonts: {
          regular: {
            fontFamily: typography.fontFamily.regular,
            fontWeight: typography.fontWeight.regular,
          },
          medium: {
            fontFamily: typography.fontFamily.medium,
            fontWeight: typography.fontWeight.medium,
          },
          bold: {
            fontFamily: typography.fontFamily.semiBold,
            fontWeight: typography.fontWeight.bold,
          },
          heavy: {
            fontFamily: typography.fontFamily.bold,
            fontWeight: typography.fontWeight.extraBold,
          },
        },
      }}>
      <RootNavigator />
    </NavigationContainer>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Provider store={store}>
            <AppContent />
          </Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
