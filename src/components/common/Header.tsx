import {StyleSheet, View, Pressable} from 'react-native';
import {ThemedText} from '../ui/ThemedText';
import {spacing} from '../../theme';
import {ChevronLeft} from 'lucide-react-native';
import {useTheme} from '../../hooks/useTheme';
import {useNavigation} from '@react-navigation/native';

type HeaderProps = {
  title: string;
  isCanGoBack?: boolean;
  actionComp?: React.ReactNode | null;
};

const Header: React.FC<HeaderProps> = ({
  title,
  isCanGoBack = true,
  actionComp = null,
}) => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme.background.primary}]}>
      {isCanGoBack && (
        <Pressable
          onPress={() =>
            navigation?.canGoBack?.() ? navigation.goBack() : undefined
          }
          style={styles.backButton}
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
          accessibilityLabel="Back"
          accessibilityRole="button">
          <ChevronLeft color={theme.icon.primary} size={24} />
        </Pressable>
      )}
      <ThemedText style={styles.title} variant="header" weight="bold">
        {title}
      </ThemedText>
      <View style={styles.actionContainer}>
        {actionComp}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  backButton: {
    padding: spacing[1],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: spacing[2],
    zIndex: 1,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  actionContainer: {
    position: 'absolute',
    right: spacing[2],
    zIndex: 1,
  },
});
