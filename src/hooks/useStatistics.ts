import { useQuery } from "@tanstack/react-query";
import { statisticsService } from "@/api/statisticsService";

/**
 * Hook to fetch overall statistics with optional date range
 * @param startDate - Optional start date (ISO format: YYYY-MM-DD)
 * @param endDate - Optional end date (ISO format: YYYY-MM-DD)
 */
export const useStatistics = (startDate?: string, endDate?: string) => {
    return useQuery({
        queryKey: ["statistics", "overall", startDate, endDate],
        queryFn: () => statisticsService.getOverall(startDate, endDate),
    });
};

/**
 * Hook to fetch statistics grouped by category with optional date range
 * @param startDate - Optional start date (ISO format: YYYY-MM-DD)
 * @param endDate - Optional end date (ISO format: YYYY-MM-DD)
 */
export const useCategoryStatistics = (startDate?: string, endDate?: string) => {
    return useQuery({
        queryKey: ["statistics", "by-category", startDate, endDate],
        queryFn: () => statisticsService.getByCategory(startDate, endDate),
    });
};

/**
 * Hook to fetch monthly statistics breakdown
 * @param year - Optional year to filter by (e.g., 2025)
 */
export const useMonthlyStatistics = (year?: number) => {
    return useQuery({
        queryKey: ["statistics", "monthly", year],
        queryFn: () => statisticsService.getMonthly(year),
    });
};
