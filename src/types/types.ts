// Enums
export enum TransactionType {
    Income = 0,
    Expense = 1,
}

export enum CategoryType {
    Income = 0,
    Expense = 1,
    Both = 2,
}

// DTOs
export interface TransactionDto {
    id: number;
    date: string;
    description: string;
    amount: number;
    type: TransactionType;
    categoryId: number;
    categoryName: string;
    notes?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface CreateTransactionDto {
    date: string;
    description: string;
    amount: number;
    type: TransactionType;
    categoryId: number;
    notes?: string;
}

export interface UpdateTransactionDto {
    date: string;
    description: string;
    amount: number;
    type: TransactionType;
    categoryId: number;
    notes?: string;
}

export interface CategoryDto {
    id: number;
    name: string;
    type: CategoryType;
    isCustom: boolean;
    createdAt: string;
}

export interface CreateCategoryDto {
    name: string;
    type: CategoryType;
}

export interface UpdateCategoryDto {
    name: string;
    type: CategoryType;
}

export interface StatisticsDto {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    transactionCount: number;
}

export interface CategoryStatisticsDto {
    categoryId: number;
    categoryName: string;
    type: TransactionType;
    totalAmount: number;
    transactionCount: number;
}

export interface MonthlyStatisticsDto {
    year: number;
    month: number;
    monthName: string;
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    transactionCount: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface ApiError {
    status: number;
    message: string;
    errors: string[];
}
