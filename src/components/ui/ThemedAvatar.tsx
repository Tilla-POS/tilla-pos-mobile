import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {User} from 'lucide-react-native';

interface ThemedAvatarProps extends ImageProps {
  size?: number;
  source?: ImageSourcePropType | undefined;
}

export const ThemedAvatar: React.FC<ThemedAvatarProps> = ({
  size = 50,
  source = undefined,
  style,
  ...props
}) => {
  const {theme} = useTheme();

  if (!source) {
    // If no source is provided, render an empty circle view with user icon
    return (
      <View
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.background.secondary,
          },
        ]}>
        <User size={size / 2} color={theme.icon.primary} />
      </View>
    );
  } else {
    return (
      <Image
        source={source}
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.background.secondary,
          },
          style,
        ]}
        {...props}
      />
    );
  }
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
