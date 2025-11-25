// Re-export all types, enums, and interfaces
export * from "./types";
export * from "./validation";
export * from "./helpers";

// Legacy types (for backward compatibility)
export interface Budget {
    id: string;
    name: string;
    amount: number;
    startDate: string;
    endDate: string;
    categoryId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    categoryId: string;
    budgetId?: string;
    userId: string;
    type: "income" | "expense";
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: string;
    name: string;
    type: "income" | "expense";
    color?: string;
    icon?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface BudgetSummary {
    budgetId: string;
    budgetName: string;
    totalAmount: number;
    spent: number;
    remaining: number;
    percentage: number;
}
