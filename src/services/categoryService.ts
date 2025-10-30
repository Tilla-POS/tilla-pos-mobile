import {FileData} from '../lib/interfaces/FileData';
import api, {ApiResponse} from './api';
import {Business} from './businessService';

export interface Category {
  id: string;
  name: string;
  image: string;
  business: Business;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateCategoryBody {
  name: string;
  image?: FileData;
}

export interface UpdateCategoryBody {
  id: string;
  name?: string;
  image?: FileData;
}

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data.data;
  },
  getCategoryById: async (id: string): Promise<Category> => {
    const response = await api.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data;
  },
  createCategory: async (body: CreateCategoryBody): Promise<Category> => {
    const formData = new FormData();
    formData.append('name', body.name);
    if (body.image) {
      formData.append('image', {
        uri: body.image.uri,
        name: body.image.name,
        type: body.image.type,
      } as any);
    }

    const response = await api.post<ApiResponse<Category>>(
      '/categories',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.data;
  },
  updateCategory: async (
    body: UpdateCategoryBody,
  ): Promise<Category> => {
    const formData = new FormData();
    if (body.name) {
      formData.append('name', body.name);
    }
    if (body.image) {
      formData.append('image', {
        uri: body.image.uri,
        name: body.image.name,
        type: body.image.type,
      } as any);
    }

    const response = await api.put<ApiResponse<Category>>(
      `/categories/${body.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.data;
  },
};
