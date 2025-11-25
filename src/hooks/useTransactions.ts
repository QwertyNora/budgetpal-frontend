import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
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
            toast.success("Transaction created successfully!");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create transaction");
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
            toast.success("Transaction updated successfully!");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update transaction");
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
            toast.success("Transaction deleted successfully!");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete transaction");
        },
    });
};
