import {icons} from 'lucide-react-native';
import {useTheme} from '../../hooks/useTheme';

interface ThemedIconProps {
  name: keyof typeof icons;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemedIcon = ({name, size = 'md'}: ThemedIconProps) => {
  const {theme} = useTheme();
  const Icon = icons[name];

  const sizeStyles = {
    sm: 16,
    md: 20,
    lg: 24,
  };
  return <Icon size={sizeStyles[size]} color={theme.icon.primary} />;
};
