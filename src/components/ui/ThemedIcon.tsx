import {icons} from 'lucide-react-native';
import {useTheme} from '../../hooks/useTheme';

interface ThemedIconProps {
  name: keyof typeof icons;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'danger';
  customSize?: number;
}

export const ThemedIcon = ({
  name,
  size = 'md',
  color = 'primary',
  customSize,
}: ThemedIconProps) => {
  const {theme} = useTheme();
  const Icon = icons[name];

  const sizeStyles = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    '2xl': 32,
    '3xl': 40,
  };

  return <Icon size={customSize || sizeStyles[size]} color={theme.icon[color]} />;
};
