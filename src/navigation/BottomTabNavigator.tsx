import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ReceiptsScreen, {RECEIPTS_SCREEN} from '../screens/ReceiptsScreen';
import ProfileScreen, {PROFILE_SCREEN} from '../screens/ProfileScreen';
import {
  User,
  ChartNoAxesCombined,
  ReceiptText,
  HandCoins,
  Package,
} from 'lucide-react-native';
import ReportScreen, {REPORT_SCREEN} from '../screens/ReportScreen';
import CashierScreen, {CASHIER_SCREEN} from '../screens/CashierScreen';
import InventoryScreen, {INVENTORY_SCREEN} from '../screens/inventory/InventoryScreen';

const Tab = createBottomTabNavigator();

type IconProps = {color: string; size?: number | undefined};

const renderReportIcon = ({color, size}: IconProps) => (
  <ChartNoAxesCombined color={color} size={size} />
);
const renderReceiptIcon = ({color, size}: IconProps) => (
  <ReceiptText color={color} size={size} />
);
const renderCashierIcon = ({color, size}: IconProps) => (
  <HandCoins color={color} size={size} />
);
const renderInventoryIcon = ({color, size}: IconProps) => (
  <Package color={color} size={size} />
);
const renderProfileIcon = ({color, size}: IconProps) => (
  <User color={color} size={size} />
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={REPORT_SCREEN}
        component={ReportScreen}
        options={{
          tabBarIcon: renderReportIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={RECEIPTS_SCREEN}
        component={ReceiptsScreen}
        options={{
          tabBarIcon: renderReceiptIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={CASHIER_SCREEN}
        component={CashierScreen}
        options={{
          tabBarIcon: renderCashierIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={INVENTORY_SCREEN}
        component={InventoryScreen}
        options={{
          tabBarIcon: renderInventoryIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarIcon: renderProfileIcon,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
