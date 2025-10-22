import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen, { LOGIN_SCREEN } from '../screens/LoginScreen';
import RegisterScreen, { REGISTER_SCREEN } from '../screens/RegisterScreen';
import OTPScreen, { OTP_SCREEN } from '../screens/OTPScreen';
import CreateBusinessScreen, { CREATE_BUSINESS_SCREEN } from '../screens/CreateBusinessScreen';

export type AuthStackParamList = {
  [LOGIN_SCREEN]: undefined;
  [REGISTER_SCREEN]: undefined;
  [OTP_SCREEN]: {
    email: string;
  };
  [CREATE_BUSINESS_SCREEN]: {
    shopkeeperId: string;
    email: string;
  };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={REGISTER_SCREEN} component={RegisterScreen} />
      <Stack.Screen name={OTP_SCREEN} component={OTPScreen} />
      <Stack.Screen name={CREATE_BUSINESS_SCREEN} component={CreateBusinessScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
