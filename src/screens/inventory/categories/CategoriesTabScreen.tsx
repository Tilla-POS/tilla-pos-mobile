import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {ThemedView} from '../../../components/ui';
import {useTheme} from '../../../hooks/useTheme';
import EmptyCategory from '@/components/specifics/inventory/EmptyCategory';
import {useGetAllCategories} from '@/hooks/useCategory';
import CategoryItem from '@/components/specifics/inventory/CategoryItem';
import CommonError from '@/components/common/CommonError';

const CategoriesTabScreen = () => {
  const {spacing} = useTheme();
  const {
    categories,
    categoriesLoading,
    categoriesFetching,
    categoriesError,
    refetchCategories,
  } = useGetAllCategories();

  let content = null;
  if (categoriesLoading) {
    content = (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (categoriesError) {
    content = (
      <CommonError
        title="Failed to load categories"
        refetch={refetchCategories}
      />
    );
  } else {
    content = (
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CategoryItem title={item.name} imageUrl={item.image} />
        )}
        contentContainerStyle={{gap: spacing[4]}}
        ListEmptyComponent={EmptyCategory}
        refreshControl={
          <RefreshControl
            refreshing={categoriesFetching}
            onRefresh={refetchCategories}
          />
        }
      />
    );
  }

  return (
    <ThemedView
      background="primary"
      style={[styles.tabContent, {padding: spacing[4]}]}>
      {content}
    </ThemedView>
  );
};

export default CategoriesTabScreen;

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
