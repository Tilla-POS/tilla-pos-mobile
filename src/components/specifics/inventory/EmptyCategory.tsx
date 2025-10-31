import {CommonEmpty} from '@/components/common/CommonEmpty';
import {ThemedButton} from '@/components/ui';
import {CREATE_CATEGORY_SCREEN} from '@/screens/inventory/categories/CreateCategoryScreen';
import {useNavigation} from '@react-navigation/native';

const EmptyCategory = () => {
  const navigation = useNavigation();
  return (
    <CommonEmpty
      message="No categories available"
      description="Categories you create will appear here.">
      <ThemedButton
        title="Create new category"
        variant="primary"
        icon="Plus"
        onPress={() => navigation.navigate(CREATE_CATEGORY_SCREEN as never)}
        size="xs"
      />
    </CommonEmpty>
  );
};

export default EmptyCategory;
