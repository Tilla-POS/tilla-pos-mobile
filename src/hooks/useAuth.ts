import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, LoginCredentials, RegisterCredentials } from '../services/authService';

const QUERY_KEY_CURRENT_TOKEN = 'CURRENT_TOKEN';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: token, isLoading } = useQuery({
    queryKey: [QUERY_KEY_CURRENT_TOKEN],
    queryFn: authService.getAccessToken,
    staleTime: Infinity,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY_CURRENT_TOKEN], data.data.accessToken);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (credentials: RegisterCredentials) => authService.register(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY_CURRENT_TOKEN], data.data.accessToken);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData([QUERY_KEY_CURRENT_TOKEN], null);
      queryClient.clear(); // Clear all cache
    },
  });

  return {
    token,
    isLoading,
    isAuthenticated: !!token,
    login: loginMutation.mutateAsync,
    loginLoading: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutateAsync,
    registerLoading: registerMutation.isPending,
    registerError: registerMutation.error,
    logout: logoutMutation.mutateAsync,
    logoutLoading: logoutMutation.isPending,
  };
};
