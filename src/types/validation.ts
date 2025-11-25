import { z } from "zod";
import { TransactionType, CategoryType } from "./types";

// Transaction validation schemas
export const createTransactionSchema = z.object({
    date: z
        .string()
        .min(1, "Date is required")
        .refine(date => {
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(23, 59, 59, 999); // End of today
            return selectedDate <= today;
        }, "Date cannot be in the future"),
    description: z.string().min(1, "Description is required").max(200, "Description must be less than 200 characters"),
    amount: z.number().positive("Amount must be greater than 0").max(999999999.99, "Amount is too large"),
    type: z.nativeEnum(TransactionType, {
        errorMap: () => ({ message: "Invalid transaction type" }),
    }),
    categoryId: z.number().int("Category ID must be an integer").positive("Category is required"),
    notes: z.string().max(500, "Notes must be less than 500 characters").optional().or(z.literal("")),
});

export const updateTransactionSchema = z.object({
    date: z
        .string()
        .min(1, "Date is required")
        .refine(date => {
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(23, 59, 59, 999); // End of today
            return selectedDate <= today;
        }, "Date cannot be in the future"),
    description: z.string().min(1, "Description is required").max(200, "Description must be less than 200 characters"),
    amount: z.number().positive("Amount must be greater than 0").max(999999999.99, "Amount is too large"),
    type: z.nativeEnum(TransactionType, {
        errorMap: () => ({ message: "Invalid transaction type" }),
    }),
    categoryId: z.number().int("Category ID must be an integer").positive("Category is required"),
    notes: z.string().max(500, "Notes must be less than 500 characters").optional().or(z.literal("")),
});

// Category validation schemas
export const createCategorySchema = z.object({
    name: z
        .string()
        .min(1, "Category name is required")
        .max(100, "Category name must be less than 100 characters")
        .regex(
            /^[a-zA-Z0-9\s-_]+$/,
            "Category name can only contain letters, numbers, spaces, hyphens, and underscores"
        ),
    type: z.nativeEnum(CategoryType, {
        errorMap: () => ({ message: "Invalid category type" }),
    }),
});

export const updateCategorySchema = z.object({
    name: z
        .string()
        .min(1, "Category name is required")
        .max(100, "Category name must be less than 100 characters")
        .regex(
            /^[a-zA-Z0-9\s-_]+$/,
            "Category name can only contain letters, numbers, spaces, hyphens, and underscores"
        ),
    type: z.nativeEnum(CategoryType, {
        errorMap: () => ({ message: "Invalid category type" }),
    }),
});

// Type inference for form data
export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionFormData = z.infer<typeof updateTransactionSchema>;
export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryFormData = z.infer<typeof updateCategorySchema>;
