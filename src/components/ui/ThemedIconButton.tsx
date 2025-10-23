import {icons} from 'lucide-react-native';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {useTheme} from '../../hooks/useTheme';

interface ThemedIconButtonProps extends TouchableOpacityProps {
  name: keyof typeof icons;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
}

export const ThemedIconButton: React.FC<ThemedIconButtonProps> = ({
  name,
  size = 'md',
  variant = 'ghost',
  loading = false,
  disabled,
  style,
  ...props
}) => {
  const Icon = icons[name];

  const {theme, spacing, radius} = useTheme();

  const sizeStyles = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const buttonColors = theme.button[variant];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {padding: spacing[1]},
        {
          backgroundColor: buttonColors.background,
          borderColor: buttonColors.border,
          borderRadius: radius.sm,
        },
        (disabled || loading) && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}>
      {loading ? (
        <ActivityIndicator color={buttonColors.text} />
      ) : (
        <Icon size={sizeStyles[size]} color={theme.icon.primary} />
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
  disabled: {
    opacity: 0.5,
  },
});
