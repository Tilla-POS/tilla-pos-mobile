import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {icons} from 'lucide-react-native';
import {useTheme} from '../../hooks/useTheme';

interface ThemedFabProps extends TouchableOpacityProps {
  name: keyof typeof icons;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const ThemedFab: React.FC<ThemedFabProps> = ({
  name,
  size = 'md',
  loading = false,
  disabled,
  style,
  ...props
}) => {
  const Icon = icons[name];
  const {theme, shadows, spacing} = useTheme();

  const sizeStyles = {
    sm: {
      buttonSize: 48,
      iconSize: 20,
    },
    md: {
      buttonSize: 56,
      iconSize: 24,
    },
    lg: {
      buttonSize: 64,
      iconSize: 28,
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <TouchableOpacity
      style={[
        styles.fab,
        {
          width: currentSize.buttonSize,
          height: currentSize.buttonSize,
          backgroundColor: theme.primary.main,
          borderRadius: spacing[1],
          ...shadows.lg,
        },
        (disabled || loading) && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}>
      {loading ? (
        <ActivityIndicator color={theme.primary.contrast} />
      ) : (
        <Icon size={currentSize.iconSize} color={theme.primary.contrast} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});
