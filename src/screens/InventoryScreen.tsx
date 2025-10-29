import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {ThemedView, ThemedFab, ThemedIcon} from '../components/ui';
import Header from '../components/common/Header';
import {useTheme} from '../hooks/useTheme';
import {useBottomSheet} from '../context/BottomSheetContext';
import ItemsTabScreen from './ItemsTabScreen';
import CategoriesTabScreen from './CategoriesTabScreen';
import ModifiersTabScreen from './ModifiersTabScreen';
import InfoItem from '../components/common/InfoItem';

export const INVENTORY_SCREEN = 'Inventory'; // For navigation reference

const renderScene = SceneMap({
  items: ItemsTabScreen,
  categories: CategoriesTabScreen,
  modifiers: ModifiersTabScreen,
});

const InventoryScreen = () => {
  const layout = useWindowDimensions();
  const {theme, typography, spacing} = useTheme();
  const {openBottomSheet, closeBottomSheet} = useBottomSheet();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'items', title: 'Items'},
    {key: 'categories', title: 'Categories'},
    {key: 'modifiers', title: 'Modifiers'},
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      scrollEnabled
      tabStyle={styles.tab}
      indicatorStyle={[
        styles.tabIndicator,
        {backgroundColor: theme.primary.main},
      ]}
      style={[
        styles.tabBar,
        {
          backgroundColor: theme.background.primary,
          borderBottomColor: theme.border.primary,
        },
      ]}
      labelStyle={[
        styles.tabLabel,
        {
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.semiBold,
        },
      ]}
      activeColor={theme.primary.main}
      inactiveColor={theme.text.secondary}
    />
  );

  const handleOpenBottomSheet = () => {
    const content = (
      <View style={{gap: spacing[4]}}>
        <TouchableOpacity onPress={closeBottomSheet}>
          <InfoItem
            icon={<ThemedIcon name="Box" size="md" color="primary" />}
            title="Item"
            subtitle="Add a new product to your inventory."
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={closeBottomSheet}>
          <InfoItem
            icon={<ThemedIcon name="Folder" size="md" color="primary" />}
            title="Category"
            subtitle="Organize your items into groups."
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={closeBottomSheet}>
          <InfoItem
            icon={
              <ThemedIcon name="SlidersVertical" size="md" color="primary" />
            }
            title="Modifier"
            subtitle="Customize items with options like size or toppings."
          />
        </TouchableOpacity>
      </View>
    );

    openBottomSheet(content, 'Create a new', ['40%']);
  };

  return (
    <ThemedView background="primary" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header title="Inventory" isCanGoBack={false} />
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </SafeAreaView>
      <ThemedFab name="Plus" size="sm" onPress={handleOpenBottomSheet} />
    </ThemedView>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  tab: {
    width: 'auto',
  },
  tabIndicator: {
    height: 1,
  },
  tabBar: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0.5,
  },
  tabLabel: {
    textTransform: 'none',
  },
});
