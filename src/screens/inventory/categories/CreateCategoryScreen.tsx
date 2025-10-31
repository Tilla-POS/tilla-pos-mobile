import {ThemedView} from '@components/ui';
import {SafeAreaView, StyleSheet} from 'react-native';
import Header from '@/components/common/Header';
import CategoryForm from '@/components/specifics/inventory/CategoryForm';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '@/navigation/MainStack';

export const CREATE_CATEGORY_SCREEN = 'CreateCategory'; // For navigation reference

type CreateCategoryScreenProps = NativeStackScreenProps<
  MainStackParamList,
  typeof CREATE_CATEGORY_SCREEN
>;

const CreateCategoryScreen: React.FC<CreateCategoryScreenProps> = ({
  navigation,
}) => {
  return (
    <ThemedView background="primary" style={styles.container}>
      <SafeAreaView style={[styles.container]}>
        <Header title="Create Category" />
        <CategoryForm navigation={navigation} />
      </SafeAreaView>
    </ThemedView>
  );
};

export default CreateCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
