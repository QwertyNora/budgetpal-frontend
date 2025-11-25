import { useState } from "react";
import { useOverallStatistics, useCategoryStatistics, useMonthlyStatistics } from "../hooks/useStatistics";
import { formatCurrency } from "../utils/formatters";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import StatCard from "../components/StatCard";
import MonthlyTrendChart from "../components/Charts/MonthlyTrendChart";
import CategoryBreakdownChart from "../components/Charts/CategoryBreakdownChart";

export default function Statistics() {
    const currentYear = new Date().getFullYear();
    const [startDate, setStartDate] = useState<string>(`${currentYear}-01-01`);
    const [endDate, setEndDate] = useState<string>(new Date().toISOString().split("T")[0]);

    const {
        data: overallStats,
        isLoading: overallLoading,
        error: overallError,
        refetch: refetchOverall,
    } = useOverallStatistics(startDate, endDate);

    const {
        data: categoryStats,
        isLoading: categoryLoading,
        error: categoryError,
        refetch: refetchCategory,
    } = useCategoryStatistics(startDate, endDate);

    const {
        data: monthlyStats,
        isLoading: monthlyLoading,
        error: monthlyError,
        refetch: refetchMonthly,
    } = useMonthlyStatistics(currentYear);

    const handleClearFilters = () => {
        setStartDate(`${currentYear}-01-01`);
        setEndDate(new Date().toISOString().split("T")[0]);
    };

    const hasFilters = startDate !== `${currentYear}-01-01` || endDate !== new Date().toISOString().split("T")[0];

    if (overallLoading || categoryLoading || monthlyLoading) {
        return (
            <div className="container mx-auto px-4 py-6 sm:py-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Statistics & Reports</h1>
                <LoadingSpinner size="xl" message="Loading statistics..." />
            </div>
        );
    }

    if (overallError || categoryError || monthlyError) {
        return (
            <div className="container mx-auto px-4 py-6 sm:py-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Statistics & Reports</h1>
                <ErrorMessage
                    error={overallError || categoryError || monthlyError}
                    onRetry={() => {
                        refetchOverall();
                        refetchCategory();
                        refetchMonthly();
                    }}
                />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 sm:py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Statistics & Reports</h1>
            </div>

            {/* Date Range Filter */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Filter by Date Range</h2>
                <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                    <div className="flex-1">
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        />
                    </div>
                    {hasFilters && (
                        <button
                            onClick={handleClearFilters}
                            className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium transition-all duration-200 hover:shadow-md"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                    title="Total Income"
                    value={formatCurrency(overallStats?.totalIncome || 0)}
                    color="green"
                    icon={
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    }
                />
                <StatCard
                    title="Total Expenses"
                    value={formatCurrency(overallStats?.totalExpenses || 0)}
                    color="red"
                    icon={
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                    }
                />
                <StatCard
                    title="Net Balance"
                    value={formatCurrency((overallStats?.totalIncome || 0) - (overallStats?.totalExpenses || 0))}
                    color={(overallStats?.totalIncome || 0) >= (overallStats?.totalExpenses || 0) ? "green" : "red"}
                    icon={
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    }
                />
                <StatCard
                    title="Transactions"
                    value={overallStats?.transactionCount?.toString() || "0"}
                    color="blue"
                    icon={
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                    }
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Monthly Trend Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Monthly Trend</h2>
                    {monthlyStats && monthlyStats.length > 0 ? (
                        <MonthlyTrendChart data={monthlyStats} />
                    ) : (
                        <div className="text-center py-8 text-gray-500">No data available for the selected period</div>
                    )}
                </div>

                {/* Category Breakdown Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Category Breakdown</h2>
                    {categoryStats && categoryStats.length > 0 ? (
                        <CategoryBreakdownChart data={categoryStats} />
                    ) : (
                        <div className="text-center py-8 text-gray-500">No data available for the selected period</div>
                    )}
                </div>
            </div>

            {/* Detailed Category Statistics */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Category Details</h2>
                {categoryStats && categoryStats.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total Amount
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Transactions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categoryStats.map((stat, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {stat.categoryName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">
                                            {formatCurrency(stat.totalAmount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                            {stat.transactionCount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No category data available for the selected period
                    </div>
                )}
            </div>
        </div>
    );
}
