import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {categoryService} from '../services/categoryService';

const QUERY_KEY_CATEGORIES = 'CATEGORIES';
const QUERY_KEY_CATEGORY = 'CATEGORY';

export const useCategoryMutation = () => {
  const queryClient = useQueryClient();
  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: categoryService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_CATEGORIES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_CATEGORY],
      });
    },
  });
  // Update category mutation
  const updateCategoryMutation = useMutation({
    mutationFn: categoryService.updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_CATEGORIES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_CATEGORY],
      });
    },
  });
  return {
    createCategory: createCategoryMutation.mutateAsync,
    createCategoryLoading: createCategoryMutation.isPending,
    createCategoryError: createCategoryMutation.error,
    updateCategory: updateCategoryMutation.mutateAsync,
    updateCategoryLoading: updateCategoryMutation.isPending,
    updateCategoryError: updateCategoryMutation.error,
  };
};

export const useGetAllCategories = () => {
  const {
    data: categories,
    isLoading: categoriesLoading,
    isFetching: categoriesFetching,
    isError: categoriesError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: [QUERY_KEY_CATEGORIES],
    queryFn: categoryService.getCategories,
    staleTime: Infinity,
    enabled: true, // Always enabled
  });

  return {
    categories,
    categoriesLoading,
    categoriesFetching,
    categoriesError,
    refetchCategories,
  };
};

export const useGetCategoryById = (id: string) => {
  const {
    data: category,
    isLoading: categoryLoading,
    isFetching: categoryFetching,
    isError: categoryError,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: [QUERY_KEY_CATEGORY, id],
    queryFn: () => categoryService.getCategoryById(id),
    staleTime: Infinity,
    enabled: !!id, // Only enabled if id is provided
  });

  return {
    category,
    categoryLoading,
    categoryFetching,
    categoryError,
    refetchCategory,
  };
};
