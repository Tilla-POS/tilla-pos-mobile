import {useQuery} from '@tanstack/react-query';
import {userService} from '../services/userService';

const QUERY_KEY_USER = 'USER';

export const useUser = () => {
  const {
    data: currentUser,
    isLoading: currentUserLoading,
    isFetching: currentUserFetching,
    isError: currentUserError,
    refetch: refetchCurrentUser,
  } = useQuery({
    queryKey: [QUERY_KEY_USER],
    queryFn: userService.getCurrentUser,
    staleTime: Infinity,
    enabled: true, // Always enabled
  });
  return {currentUser, currentUserLoading, currentUserFetching, currentUserError, refetchCurrentUser};
};
