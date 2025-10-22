import React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import {ThemedView} from '../components/ui/ThemedView';
import {ThemedText} from '../components/ui/ThemedText';
import {ThemedCard} from '../components/ui/ThemedCard';
import {Sun, Moon, Monitor} from 'lucide-react-native';

export const REPORT_SCREEN = 'Report'; // For navigation reference

const ReportScreen = () => {
  const {theme, mode, setTheme, spacing} = useTheme();

  const themeOptions = [
    {value: 'light', label: 'Light', icon: Sun},
    {value: 'dark', label: 'Dark', icon: Moon},
    {value: 'system', label: 'System', icon: Monitor},
  ];

  return (
    <ThemedView background="secondary" style={styles.container}>
      <ScrollView>
        {/* Theme Selection */}
        <View style={[styles.section, {marginTop: spacing[4]}]}>
          <ThemedText variant="h4" style={styles.sectionTitle}>
            Appearance
          </ThemedText>

          <ThemedCard elevation="sm">
            {themeOptions.map((option, index) => {
              const Icon = option.icon;
              const isSelected = mode === option.value;

              // compute dynamic style object to avoid inline expression parsing issues
              const optionStyle = [
                styles.themeOption,
                {
                  borderBottomWidth: index < themeOptions.length - 1 ? 1 : 0,
                  borderBottomColor: theme.border.primary,
                  backgroundColor: isSelected
                    ? `${theme.primary.main}10`
                    : 'transparent',
                },
              ];

              return (
                <TouchableOpacity
                  key={option.value}
                  style={optionStyle}
                  onPress={() => setTheme(option.value as any)}>
                  <View style={styles.themeOptionLeft}>
                    <Icon
                      color={
                        isSelected ? theme.primary.main : theme.icon.secondary
                      }
                      size={24}
                    />
                    <ThemedText
                      weight={isSelected ? 'semiBold' : 'regular'}
                      color={isSelected ? 'primary' : 'secondary'}
                      style={styles.themeOptionText}>
                      {option.label}
                    </ThemedText>
                  </View>
                  {isSelected && (
                    <View
                      style={[
                        styles.selectedIndicator,
                        {backgroundColor: theme.primary.main},
                      ]}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ThemedCard>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <ThemedText variant="h4" style={styles.sectionTitle}>
            Notifications
          </ThemedText>

          <ThemedCard elevation="sm">
            <View
              style={[
                styles.settingItem,
                {borderBottomColor: theme.border.primary},
              ]}>
              <View style={styles.settingInfo}>
                <ThemedText weight="medium">Push Notifications</ThemedText>
                <ThemedText variant="caption" color="secondary">
                  Receive push notifications
                </ThemedText>
              </View>
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <ThemedText weight="medium">Email Notifications</ThemedText>
                <ThemedText variant="caption" color="secondary">
                  Receive email updates
                </ThemedText>
              </View>
            </View>
          </ThemedCard>
        </View>

        {/* Privacy */}
        <View style={styles.section}>
          <ThemedText variant="h4" style={styles.sectionTitle}>
            Privacy
          </ThemedText>

          <ThemedCard elevation="sm">
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <ThemedText weight="medium">Private Profile</ThemedText>
                <ThemedText variant="caption" color="secondary">
                  Make your profile private
                </ThemedText>
              </View>
            </View>
          </ThemedCard>
        </View>

        {/* About */}
        <View style={styles.section}>
          <ThemedText variant="h4" style={styles.sectionTitle}>
            About
          </ThemedText>

          <ThemedCard elevation="sm">
            <TouchableOpacity
              style={[
                styles.menuItem,
                {borderBottomColor: theme.border.primary},
              ]}>
              <ThemedText>Terms of Service</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.menuItem,
                {borderBottomColor: theme.border.primary},
              ]}>
              <ThemedText>Privacy Policy</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.menuItem,
                {borderBottomColor: theme.border.primary},
              ]}>
              <ThemedText>Help Center</ThemedText>
            </TouchableOpacity>

            <View style={styles.menuItem}>
              <ThemedText>Version</ThemedText>
              <ThemedText color="secondary">1.0.0</ThemedText>
            </View>
          </ThemedCard>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  themeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  themeOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeOptionText: {
    marginLeft: 12,
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
});

export default ReportScreen;
