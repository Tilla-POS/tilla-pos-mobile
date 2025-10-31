import React from 'react';
import {View, StyleSheet} from 'react-native';
import {icons} from 'lucide-react-native';
import {useTheme} from '../../hooks/useTheme';
import {ThemedIcon, ThemedText} from '../ui';

interface CommonEmptyProps {
  /**
   * Icon component from lucide-react-native
   */
  icon?: keyof typeof icons;
  /**
   * Main message to display
   */
  message: string;
  /**
   * Optional description text
   */
  description?: string;
  /**
   * Additional custom content to render below description
   */
  children?: React.ReactNode;
}

export const CommonEmpty: React.FC<CommonEmptyProps> = ({
  icon = 'PackageOpen',
  message,
  description,
  children,
}) => {
  const {theme, spacing, radius} = useTheme();

  return (
    <View style={[styles.container, {gap: spacing[2]}]}>
      <View
        style={[
          styles.iconContainer,
          {
            padding: spacing[4],
            backgroundColor: theme.background.secondary,
            borderRadius: radius.md,
          },
        ]}>
        <ThemedIcon name={icon} size="3xl" />
      </View>
      <ThemedText variant="h4" color="secondary" weight="bold">
        {message}
      </ThemedText>
      {description && (
        <ThemedText variant="caption" color="tertiary" weight="regular">
          {description}
        </ThemedText>
      )}
      {children && <View style={{marginTop: spacing[2]}}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {},
});
