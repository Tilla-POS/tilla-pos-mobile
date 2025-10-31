import {
  ControlledThemedFileUpload,
  ControlledThemedInput,
} from '@/components/form';
import {ThemedButton} from '@/components/ui';
import {useCategoryMutation} from '@/hooks/useCategory';
import {useTheme} from '@/hooks/useTheme';
import {
  CreateCategorySchema,
  createCategorySchema,
} from '@/lib/schema/category.schema';
import {MainStackParamList} from '@/navigation/MainStack';
import {CREATE_CATEGORY_SCREEN} from '@/screens/inventory/categories/CreateCategoryScreen';
import {zodResolver} from '@hookform/resolvers/zod';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';

type CategoryFormProps = {
  navigation?: NativeStackNavigationProp<
    MainStackParamList,
    typeof CREATE_CATEGORY_SCREEN
  >;
};

const CategoryForm: React.FC<CategoryFormProps> = ({navigation}) => {
  const {spacing} = useTheme();
  const {createCategory, createCategoryLoading} = useCategoryMutation();
  const {control, handleSubmit} = useForm<CreateCategorySchema>({
    defaultValues: {
      name: '',
      image: null,
    },
    resolver: zodResolver(createCategorySchema),
  });
  const onSubmit = async (data: CreateCategorySchema) => {
    await createCategory({
      name: data.name,
      image: {
        uri: data.image!.uri,
        type: data.image!.type!,
        name: data.image!.name!,
      },
    });
    navigation?.goBack();
  };
  return (
    <View style={{padding: spacing[4], gap: spacing[2]}}>
      <ControlledThemedFileUpload
        control={control}
        name="image"
        label="Main Category Image"
        placeholder="Upload main image"
        maxSizeInMB={5}
        variant="default"
        size="lg"
      />
      <ControlledThemedInput
        control={control}
        name="name"
        label="Category Name"
        placeholder="Enter category name"
      />
      <ThemedButton
        loading={createCategoryLoading}
        title="Save"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default CategoryForm;
