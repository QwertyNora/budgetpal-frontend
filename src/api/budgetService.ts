import api from './api';
import type { Budget } from '@/types';

export const budgetService = {
  getAll: async (): Promise<Budget[]> => {
    const response = await api.get('/budgets');
    return response.data;
  },

  getById: async (id: string): Promise<Budget> => {
    const response = await api.get(`/budgets/${id}`);
    return response.data;
  },

  create: async (budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>): Promise<Budget> => {
    const response = await api.post('/budgets', budget);
    return response.data;
  },

  update: async (id: string, budget: Partial<Budget>): Promise<Budget> => {
    const response = await api.put(`/budgets/${id}`, budget);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/budgets/${id}`);
  },
};
