import api, {ApiResponse} from './api';

export interface BusinessType {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessTypeOptions {
  label: string;
  value: string;
}

export const businessTypeService = {
  getBusinessTypesOptions: async (): Promise<BusinessTypeOptions[]> => {
    const response = await api.get<ApiResponse<BusinessTypeOptions[]>>(
      '/business-types/options',
    );
    console.log('businessTypeService.getBusinessTypesOptions response:', response);
    return response.data.data;
  },
};
