import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { budgetService } from '@/api/budgetService';
import type { Budget } from '@/types';

export const useBudgets = () => {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: budgetService.getAll,
  });
};

export const useBudget = (id: string) => {
  return useQuery({
    queryKey: ['budgets', id],
    queryFn: () => budgetService.getById(id),
    enabled: !!id,
  });
};

export const useCreateBudget = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: budgetService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};

export const useUpdateBudget = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Budget> }) =>
      budgetService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: budgetService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};
