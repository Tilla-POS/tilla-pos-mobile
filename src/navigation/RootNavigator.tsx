import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useTheme } from '../hooks/useTheme';

const RootNavigator = () => {
  const {theme} = useTheme();
  const {isAuthenticated, isLoading} = useAuth();

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, {backgroundColor: theme.background.primary}]}>
        <ActivityIndicator size="large" color={theme.primary.main} />
      </View>
    );
  }

  return isAuthenticated ? <MainStack /> : <AuthStack />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootNavigator;
