import api, { ApiResponse } from './api';
import {Business} from './businessService';

export interface User {
  id: string;
  username: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  business: Business | null;
}

export const userService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/users/me');
    return response.data.data;
  },
};
