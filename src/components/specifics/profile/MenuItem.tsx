import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ThemedText} from '../../ui/ThemedText';
import {spacing} from '../../../theme';
import {useTheme} from '../../../hooks/useTheme';

type MenuItemProps = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({title, icon, onPress}) => {
  const {theme, radius} = useTheme();
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: theme.background.secondary,
            borderRadius: radius.sm,
          },
        ]}>
        {icon}
      </View>
      <ThemedText variant="body" style={styles.title}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    gap: spacing[4],
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
});
