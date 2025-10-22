import {useQuery} from '@tanstack/react-query';
import {businessTypeService} from '../services/businessTypeService';

const QUERY_KEY_BUSINESS_TYPES = 'BUSINESS_TYPES';

export const useBusinessTypeOptions = () => {
  console.log('useBusinessTypeOptions hook called');

  const {data, isLoading, error} = useQuery({
    queryKey: [QUERY_KEY_BUSINESS_TYPES],
    queryFn: businessTypeService.getBusinessTypesOptions,
    staleTime: Infinity,
    enabled: true, // Explicitly enable the query
  });

  return {data, isLoading, error};
};
