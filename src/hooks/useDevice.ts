/**
 * Hook to fetch all the authenticated user's devices from the backend API
 * and provide loading and error states.
 * Uses react-query for data fetching and caching.
 */

import {useQuery} from '@tanstack/react-query';
import {devicesService} from '../services/devicesService';

const QUERY_KEY_DEVICES = 'DEVICES';

export const useDevice = () => {
  const {
    data: devices,
    isLoading: isLoadingDevices,
    isFetching: isFetchingDevices,
    error: errorDevices,
    refetch: refetchDevices,
  } = useQuery({
    queryKey: [QUERY_KEY_DEVICES],
    queryFn: devicesService.fetchUserDevices,
    staleTime: Infinity,
  });

  return {
    devices,
    isLoadingDevices,
    isFetchingDevices,
    errorDevices,
    refetchDevices,
  };
};
