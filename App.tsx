import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
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
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Provider store={store}>
              <BottomSheetModalProvider>
                <AppContent />
              </BottomSheetModalProvider>
            </Provider>
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default App;
