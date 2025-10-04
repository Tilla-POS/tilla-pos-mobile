import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ReceiptsScreen from '../screens/ReceiptsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {
  User,
  ChartNoAxesCombined,
  ReceiptText,
  HandCoins,
  Package,
} from 'lucide-react-native';
import ReportScreen from '../screens/ReportScreen';
import CashierScreen from '../screens/CashierScreen';
import InventoryScreen from '../screens/InventoryScreen';

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
        name="Reports"
        component={ReportScreen}
        options={{
          tabBarIcon: renderReportIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Receipts"
        component={ReceiptsScreen}
        options={{
          tabBarIcon: renderReceiptIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cashier"
        component={CashierScreen}
        options={{
          tabBarIcon: renderCashierIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          tabBarIcon: renderInventoryIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
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
