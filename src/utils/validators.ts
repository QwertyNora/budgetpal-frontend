import { z } from "zod";
import { TransactionType, CategoryType } from "../types/types";

/**
 * Transaction validation schema for creating new transactions
 * Matches backend validation rules exactly:
 * - Date: required, cannot be in the future
 * - Description: required, 1-200 characters
 * - Amount: required, positive number, max 999,999,999.99
 * - Type: required, must be valid TransactionType enum (0 or 1)
 * - CategoryId: required, positive integer
 * - Notes: optional, max 500 characters
 */
export const transactionSchema = z.object({
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

/**
 * Category validation schema for creating new categories
 * Matches backend validation rules exactly:
 * - Name: required, 1-100 characters, alphanumeric + spaces/hyphens/underscores
 * - Type: required, must be valid CategoryType enum (0, 1, or 2)
 */
export const categorySchema = z.object({
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

/**
 * Date range validation schema
 * Used for filtering statistics and reports
 */
export const dateRangeSchema = z
    .object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
    })
    .refine(
        data => {
            if (!data.startDate || !data.endDate) return true;
            return new Date(data.startDate) <= new Date(data.endDate);
        },
        {
            message: "Start date must be before or equal to end date",
            path: ["endDate"],
        }
    );

/**
 * Validation helper: Check if a string is a valid date
 */
export const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Validation helper: Check if a date is in the future
 */
export const isDateInFuture = (dateString: string): boolean => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return date > today;
};

/**
 * Validation helper: Check if amount is within valid range
 */
export const isValidAmount = (amount: number): boolean => {
    return amount > 0 && amount <= 999999999.99;
};

/**
 * Validation helper: Check if a string has valid length
 */
export const isValidLength = (str: string, min: number, max: number): boolean => {
    const length = str.trim().length;
    return length >= min && length <= max;
};

/**
 * Type inference for form data
 */
export type TransactionFormData = z.infer<typeof transactionSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;
export type DateRangeFormData = z.infer<typeof dateRangeSchema>;

/**
 * Export schemas with different names for backward compatibility
 */
export const createTransactionSchema = transactionSchema;
export const updateTransactionSchema = transactionSchema;
export const createCategorySchema = categorySchema;
export const updateCategorySchema = categorySchema;
