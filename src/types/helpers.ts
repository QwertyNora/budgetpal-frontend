import { TransactionType, CategoryType, ApiError } from "./types";

// Type guards
export function isApiError(error: unknown): error is ApiError {
    return typeof error === "object" && error !== null && "status" in error && "message" in error && "errors" in error;
}

// Transaction type helpers
export function getTransactionTypeLabel(type: TransactionType): string {
    switch (type) {
        case TransactionType.Income:
            return "Income";
        case TransactionType.Expense:
            return "Expense";
        default:
            return "Unknown";
    }
}

export function getTransactionTypeColor(type: TransactionType): string {
    switch (type) {
        case TransactionType.Income:
            return "text-green-600";
        case TransactionType.Expense:
            return "text-red-600";
        default:
            return "text-gray-600";
    }
}

export function getTransactionTypeBadgeColor(type: TransactionType): string {
    switch (type) {
        case TransactionType.Income:
            return "bg-green-100 text-green-800";
        case TransactionType.Expense:
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

// Category type helpers
export function getCategoryTypeLabel(type: CategoryType): string {
    switch (type) {
        case CategoryType.Income:
            return "Income";
        case CategoryType.Expense:
            return "Expense";
        case CategoryType.Both:
            return "Both";
        default:
            return "Unknown";
    }
}

export function getCategoryTypeColor(type: CategoryType): string {
    switch (type) {
        case CategoryType.Income:
            return "text-green-600";
        case CategoryType.Expense:
            return "text-red-600";
        case CategoryType.Both:
            return "text-blue-600";
        default:
            return "text-gray-600";
    }
}

export function getCategoryTypeBadgeColor(type: CategoryType): string {
    switch (type) {
        case CategoryType.Income:
            return "bg-green-100 text-green-800";
        case CategoryType.Expense:
            return "bg-red-100 text-red-800";
        case CategoryType.Both:
            return "bg-blue-100 text-blue-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

// Amount formatting with sign
export function formatAmountWithSign(amount: number, type: TransactionType): string {
    const sign = type === TransactionType.Income ? "+" : "-";
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
}
