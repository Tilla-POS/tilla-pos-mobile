import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {ThemedView} from '../components/ui/ThemedView';
import Header from '../components/common/Header';
import MenuItem from '../components/specifics/profile/MenuItem';
import {
  Bell,
  CreditCard,
  MessageCircleQuestionMark,
  MonitorSmartphone,
  Settings,
  Store,
  User,
  UsersRound,
} from 'lucide-react-native';
import {useTheme} from '../hooks/useTheme';
import MenuGroup from '../components/specifics/profile/MenuGropu';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainStack';
import {USER_PROFILE_SCREEN} from './UserProfileScreen';

export const PROFILE_SCREEN = 'Profile'; // For navigation reference

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const ProfileScreen = () => {
  const {theme, spacing} = useTheme();
  const navigation = useNavigation<NavigationProp>();
  return (
    <ThemedView background="primary" style={styles.container}>
      <SafeAreaView>
        <Header title="Profile" isCanGoBack={false} />
        <View style={{gap: spacing[4]}}>
          <MenuGroup title="User">
            <MenuItem
              title="User profile"
              icon={<User color={theme.icon.primary} />}
              onPress={() => navigation.navigate(USER_PROFILE_SCREEN)}
            />
            <MenuItem
              title="Notifications"
              icon={<Bell color={theme.icon.primary} />}
              onPress={() => {}}
            />
            <MenuItem
              title="Customer support"
              icon={<MessageCircleQuestionMark color={theme.icon.primary} />}
              onPress={() => {}}
            />
          </MenuGroup>
          <MenuGroup title="Business">
            <MenuItem
              title="Business Profile"
              icon={<Store color={theme.icon.primary} />}
              onPress={() => {}}
            />
            <MenuItem
              title="Customers"
              icon={<UsersRound color={theme.icon.primary} />}
              onPress={() => {}}
            />
            <MenuItem
              title="Settings"
              icon={<Settings color={theme.icon.primary} />}
              onPress={() => {}}
            />
            <MenuItem
              title="Devices Management"
              icon={<MonitorSmartphone color={theme.icon.primary} />}
              onPress={() => {}}
            />
          </MenuGroup>
          <MenuGroup title="Subscription">
            <MenuItem
              title="Subscription plans"
              icon={<CreditCard color={theme.icon.primary} />}
              onPress={() => {}}
            />
          </MenuGroup>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;
