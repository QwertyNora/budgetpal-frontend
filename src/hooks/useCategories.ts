import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "../api/categoryService";
import { UpdateCategoryDto } from "../types/types";

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: categoryService.getAll,
    });
};

export const useCategory = (id: number) => {
    return useQuery({
        queryKey: ["category", id],
        queryFn: () => categoryService.getById(id),
        enabled: !!id,
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: categoryService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["statistics"] });
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateCategoryDto }) => categoryService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["statistics"] });
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: categoryService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["statistics"] });
        },
    });
};
