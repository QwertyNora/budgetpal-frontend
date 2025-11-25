import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "../api/transactionService";
import { UpdateTransactionDto } from "../types/types";

export const useTransactions = (pageNumber: number, pageSize: number) => {
    return useQuery({
        queryKey: ["transactions", pageNumber, pageSize],
        queryFn: () => transactionService.getAll(pageNumber, pageSize),
    });
};

export const useTransaction = (id: number) => {
    return useQuery({
        queryKey: ["transaction", id],
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
            queryClient.invalidateQueries({ queryKey: ["statistics"] });
        },
    });
};

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateTransactionDto }) => transactionService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["statistics"] });
        },
    });
};

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: transactionService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["statistics"] });
        },
    });
};
