import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import UserProfileScreen, {USER_PROFILE_SCREEN} from '../screens/UserProfileScreen';
import BusinessProfileScreen, { BUSINESS_PROFILE_SCREEN } from '../screens/BusinessProfileScreen';

export type MainStackParamList = {
  MainTabs: undefined;
  [USER_PROFILE_SCREEN]: undefined;
  [BUSINESS_PROFILE_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen
        name={USER_PROFILE_SCREEN}
        component={UserProfileScreen}
        options={{
          presentation: 'card', // or 'modal' for iOS modal presentation
        }}
      />
      <Stack.Screen
        name={BUSINESS_PROFILE_SCREEN}
        component={BusinessProfileScreen}
        options={{
          presentation: 'card',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
