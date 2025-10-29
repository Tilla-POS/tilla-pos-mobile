import {StyleSheet} from 'react-native';
import {ThemedText, ThemedView} from '../components/ui';
import {useTheme} from '../hooks/useTheme';

const CategoriesTabScreen = () => {
  const {spacing} = useTheme();
  return (
    <ThemedView
      background="primary"
      style={[styles.tabContent, {padding: spacing[4]}]}>
      <ThemedText variant="body" color="secondary">
        Categories content coming soon...
      </ThemedText>
    </ThemedView>
  );
};

export default CategoriesTabScreen;

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
  },
});
