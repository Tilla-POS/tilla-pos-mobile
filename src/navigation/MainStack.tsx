import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import UserProfileScreen, {
  USER_PROFILE_SCREEN,
} from '../screens/UserProfileScreen';
import BusinessProfileScreen, {
  BUSINESS_PROFILE_SCREEN,
} from '../screens/BusinessProfileScreen';
import DevicesScreen, {DEVICES_SCREEN} from '../screens/DevicesScreen';
import {BottomSheetProvider, useBottomSheet} from '../context/BottomSheetContext';
import {ThemedBottomSheet} from '../components/ui';

export type MainStackParamList = {
  MainTabs: undefined;
  [USER_PROFILE_SCREEN]: undefined;
  [BUSINESS_PROFILE_SCREEN]: undefined;
  [DEVICES_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
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
      <Stack.Screen
        name={DEVICES_SCREEN}
        component={DevicesScreen}
        options={{
          presentation: 'card',
        }}
      />
    </Stack.Navigator>
  );
};

const MainStackWithBottomSheet = () => {
  const {bottomSheetRef, state} = useBottomSheet();

  return (
    <>
      <MainStackNavigator />
      <ThemedBottomSheet
        ref={bottomSheetRef}
        title={state.title}
        snapPoints={state.snapPoints || ['50%', '90%']}
        onClose={() => console.log('Bottom sheet closed')}>
        {state.content}
      </ThemedBottomSheet>
    </>
  );
};

const MainStack = () => {
  return (
    <BottomSheetProvider>
      <MainStackWithBottomSheet />
    </BottomSheetProvider>
  );
};

export default MainStack;
