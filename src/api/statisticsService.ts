import { api } from "./api";
import { StatisticsDto, CategoryStatisticsDto, MonthlyStatisticsDto, ApiError } from "../types/types";
import { AxiosError } from "axios";

// Error handler to extract ApiError format from response
const handleApiError = (error: unknown): never => {
    if (error instanceof AxiosError && error.response) {
        const apiError: ApiError = {
            status: error.response.status,
            message: error.response.data?.message || error.message,
            errors: error.response.data?.errors || [],
        };
        throw apiError;
    }

    // Handle non-Axios errors
    const genericError: ApiError = {
        status: 500,
        message: error instanceof Error ? error.message : "An unexpected error occurred",
        errors: [],
    };
    throw genericError;
};

export const statisticsService = {
    /**
     * GET /api/statistics
     * Get overall statistics with optional date range filtering
     * @param startDate - Optional start date (ISO format: YYYY-MM-DD)
     * @param endDate - Optional end date (ISO format: YYYY-MM-DD)
     * @returns Overall statistics including total income, expenses, balance, and transaction count
     */
    getOverall: async (startDate?: string, endDate?: string): Promise<StatisticsDto> => {
        try {
            const params: Record<string, string> = {};
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;

            const response = await api.get("/statistics", { params });
            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },

    /**
     * GET /api/statistics/by-category
     * Get statistics grouped by category with optional date range filtering
     * @param startDate - Optional start date (ISO format: YYYY-MM-DD)
     * @param endDate - Optional end date (ISO format: YYYY-MM-DD)
     * @returns Array of category statistics
     */
    getByCategory: async (startDate?: string, endDate?: string): Promise<CategoryStatisticsDto[]> => {
        try {
            const params: Record<string, string> = {};
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;

            const response = await api.get("/statistics/by-category", { params });
            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },

    /**
     * GET /api/statistics/monthly
     * Get monthly statistics breakdown with optional year filtering
     * @param year - Optional year to filter by (e.g., 2025)
     * @returns Array of monthly statistics
     */
    getMonthly: async (year?: number): Promise<MonthlyStatisticsDto[]> => {
        try {
            const params: Record<string, string> = {};
            if (year) params.year = year.toString();

            const response = await api.get("/statistics/monthly", { params });
            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },
};
