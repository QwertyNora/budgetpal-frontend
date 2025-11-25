import { useQuery } from "@tanstack/react-query";
import { statisticsService } from "../api/statisticsService";

export const useOverallStatistics = (startDate?: string, endDate?: string) => {
    return useQuery({
        queryKey: ["statistics", "overall", startDate, endDate],
        queryFn: () => statisticsService.getOverall(startDate, endDate),
    });
};

export const useCategoryStatistics = (startDate?: string, endDate?: string) => {
    return useQuery({
        queryKey: ["statistics", "by-category", startDate, endDate],
        queryFn: () => statisticsService.getByCategory(startDate, endDate),
    });
};

export const useMonthlyStatistics = (year?: number) => {
    return useQuery({
        queryKey: ["statistics", "monthly", year],
        queryFn: () => statisticsService.getMonthly(year),
    });
};
