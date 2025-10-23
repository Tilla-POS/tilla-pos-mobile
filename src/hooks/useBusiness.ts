import {useQuery} from '@tanstack/react-query';
import {businessService} from '../services/businessService';

const QUERY_KEY_BUSINESS = 'BUSINESS';

export const useBusiness = () => {
  const {
    data: myBusiness,
    isLoading: myBusinessLoading,
    isFetching: myBusinessFetching,
    error: myBusinessError,
    refetch: refetchMyBusiness,
  } = useQuery({
    queryKey: [QUERY_KEY_BUSINESS],
    queryFn: businessService.getMyBusiness,
    staleTime: Infinity,
    enabled: true, // Explicitly enable the query
  });

  return {
    myBusiness,
    myBusinessLoading,
    myBusinessFetching,
    myBusinessError,
    refetchMyBusiness,
  };
};
