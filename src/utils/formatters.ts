import { TransactionType, CategoryType } from "../types/types";
import { format, parseISO } from "date-fns";

/**
 * Format a number as currency (e.g., 1234.56 -> "$1,234.56")
 */
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

/**
 * Format a date string (e.g., "2025-11-25T10:00:00Z" -> "Nov 25, 2025")
 */
export const formatDate = (dateString: string): string => {
    try {
        const date = parseISO(dateString);
        return format(date, "MMM dd, yyyy");
    } catch (error) {
        console.error("Error formatting date:", error);
        return dateString;
    }
};

/**
 * Format a date string with time (e.g., "2025-11-25T10:00:00Z" -> "Nov 25, 2025 10:00 AM")
 */
export const formatDateTime = (dateString: string): string => {
    try {
        const date = parseISO(dateString);
        return format(date, "MMM dd, yyyy hh:mm a");
    } catch (error) {
        console.error("Error formatting datetime:", error);
        return dateString;
    }
};

/**
 * Get month name from number (1 -> "January", 12 -> "December")
 */
export const getMonthName = (month: number): string => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    if (month < 1 || month > 12) {
        console.warn(`Invalid month number: ${month}`);
        return "Unknown";
    }

    return months[month - 1];
};

/**
 * Get short month name from number (1 -> "Jan", 12 -> "Dec")
 */
export const getShortMonthName = (month: number): string => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (month < 1 || month > 12) {
        console.warn(`Invalid month number: ${month}`);
        return "Unknown";
    }

    return months[month - 1];
};

/**
 * Get text color class for transaction type
 */
export const getTransactionColor = (type: TransactionType): string => {
    return type === TransactionType.Income ? "text-green-600" : "text-red-600";
};

/**
 * Get background color class for transaction type badge
 */
export const getTransactionBadgeColor = (type: TransactionType): string => {
    return type === TransactionType.Income
        ? "bg-green-100 text-green-800 border-green-300"
        : "bg-red-100 text-red-800 border-red-300";
};

/**
 * Get transaction type label
 */
export const getTransactionTypeLabel = (type: TransactionType): string => {
    return type === TransactionType.Income ? "Income" : "Expense";
};

/**
 * Get text color class for category type
 */
export const getCategoryTypeColor = (type: CategoryType): string => {
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
};

/**
 * Get background color class for category type badge
 */
export const getCategoryTypeBadgeColor = (type: CategoryType): string => {
    switch (type) {
        case CategoryType.Income:
            return "bg-green-100 text-green-800 border-green-300";
        case CategoryType.Expense:
            return "bg-red-100 text-red-800 border-red-300";
        case CategoryType.Both:
            return "bg-blue-100 text-blue-800 border-blue-300";
        default:
            return "bg-gray-100 text-gray-800 border-gray-300";
    }
};

/**
 * Get category type label
 */
export const getCategoryTypeLabel = (type: CategoryType): string => {
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
};

/**
 * Format amount with sign based on transaction type
 */
export const formatAmountWithSign = (amount: number, type: TransactionType): string => {
    const sign = type === TransactionType.Income ? "+" : "-";
    return `${sign}${formatCurrency(Math.abs(amount))}`;
};

/**
 * Calculate percentage (e.g., for budget usage)
 */
export const calculatePercentage = (value: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
};

/**
 * Format a percentage (e.g., 0.7534 -> "75.34%")
 */
export const formatPercentage = (value: number, decimals: number = 2): string => {
    return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
};

/**
 * Format a number with thousands separator (e.g., 1234567 -> "1,234,567")
 */
export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US").format(num);
};
