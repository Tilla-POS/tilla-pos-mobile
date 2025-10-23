import api, {ApiResponse} from './api';
import {BusinessType} from './businessTypeService';
import { User } from './userService';

export interface Business {
  id: string;
  name: string;
  currency: string;
  slug: string;
  image: string;
  businessType: BusinessType;
  shopkeeper: User;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isActive: true;
}

export const businessService = {
  getMyBusiness: async (): Promise<Business> => {
    const response = await api.get<ApiResponse<Business>>('/businesses/me');
    return response.data.data;
  },
};
