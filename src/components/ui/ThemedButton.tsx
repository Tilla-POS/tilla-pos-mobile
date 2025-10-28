import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {ThemedText} from './ThemedText';
import {icons} from 'lucide-react-native';
import {ThemedIcon} from './ThemedIcon';

interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: keyof typeof icons;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  style,
  disabled,
  icon,
  ...props
}) => {
  const {theme, spacing, radius} = useTheme();

  const sizeStyles = {
    xs: {
      paddingVertical: spacing[1],
      paddingHorizontal: spacing[2],
    },
    sm: {
      paddingVertical: spacing[2],
      paddingHorizontal: spacing[3],
    },
    md: {
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[4],
    },
    lg: {
      paddingVertical: spacing[4],
      paddingHorizontal: spacing[6],
    },
  };

  const buttonColors = theme.button[variant];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        sizeStyles[size],
        {
          backgroundColor: buttonColors.background,
          borderColor: buttonColors.border,
          borderRadius: radius.sm,
        },
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}>
      {loading ? (
        <ActivityIndicator color={buttonColors.text} />
      ) : (
        <View style={[styles.contentContainer, icon && {gap: spacing[2]}]}>
          {icon && (
            <ThemedIcon
              name={icon}
              size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
            />
          )}
          <ThemedText weight="semiBold" style={{color: buttonColors.text}}>
            {title}
          </ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
