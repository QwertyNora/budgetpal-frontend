import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "@/api/transactionService";
import { UpdateTransactionDto } from "@/types";

export const useTransactions = (pageNumber: number = 1, pageSize: number = 20) => {
    return useQuery({
        queryKey: ["transactions", pageNumber, pageSize],
        queryFn: () => transactionService.getAll(pageNumber, pageSize),
    });
};

export const useTransaction = (id: number) => {
    return useQuery({
        queryKey: ["transactions", id],
        queryFn: () => transactionService.getById(id),
        enabled: !!id,
    });
};

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transactionService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
        },
    });
};

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateTransactionDto }) => transactionService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
        },
    });
};

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: transactionService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
        },
    });
};
