import api from './api';
import type { Category } from '@/types';

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  getById: async (id: string): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  create: async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
    const response = await api.post('/categories', category);
    return response.data;
  },

  update: async (id: string, category: Partial<Category>): Promise<Category> => {
    const response = await api.put(`/categories/${id}`, category);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};
