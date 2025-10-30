import {StyleSheet} from 'react-native';
import {ThemedText, ThemedView} from '@components/ui';
import {useTheme} from '@hooks/useTheme';

const ItemsTabScreen = () => {
  const {spacing} = useTheme();
  return (
    <ThemedView
      background="primary"
      style={[styles.tabContent, {padding: spacing[4]}]}>
      <ThemedText variant="body" color="secondary">
        Items content coming soon...
      </ThemedText>
    </ThemedView>
  );
};

export default ItemsTabScreen;

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
  },
});
