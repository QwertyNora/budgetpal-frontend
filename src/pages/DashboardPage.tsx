import { useState } from "react";
import { useOverallStatistics, useCategoryStatistics, useMonthlyStatistics } from "../hooks/useStatistics";
import StatCard from "../components/StatCard";
import MonthlyTrendChart from "../components/Charts/MonthlyTrendChart";
import CategoryBreakdownChart from "../components/Charts/CategoryBreakdownChart";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function DashboardPage() {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    // Fetch statistics with optional date range
    const {
        data: overallStats,
        isLoading: overallLoading,
        error: overallError,
        refetch: refetchOverall,
    } = useOverallStatistics(startDate || undefined, endDate || undefined);

    const { data: categoryStats, isLoading: categoryLoading } = useCategoryStatistics(
        startDate || undefined,
        endDate || undefined
    );

    const { data: monthlyStats, isLoading: monthlyLoading } = useMonthlyStatistics(
        startDate ? new Date(startDate).getFullYear() : undefined
    );

    const handleClearFilters = () => {
        setStartDate("");
        setEndDate("");
    };

    const hasFilters = startDate || endDate;

    // Determine balance color
    const getBalanceColor = (balance: number): "green" | "red" | "blue" => {
        if (balance > 0) return "green";
        if (balance < 0) return "red";
        return "blue";
    };

    if (overallError) {
        return (
            <div className="container mx-auto px-4 py-8">
                <ErrorMessage error={overallError} title="Error loading statistics" onRetry={() => refetchOverall()} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Overview of your financial activity</p>
            </div>

            {/* Date Range Filter */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <div className="flex flex-wrap items-end gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {hasFilters && (
                        <button
                            onClick={handleClearFilters}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
                {hasFilters && (
                    <div className="mt-2 text-sm text-blue-600">
                        {startDate &&
                            endDate &&
                            `Showing data from ${new Date(startDate).toLocaleDateString()} to ${new Date(
                                endDate
                            ).toLocaleDateString()}`}
                        {startDate &&
                            !endDate &&
                            `Showing data from ${new Date(startDate).toLocaleDateString()} onwards`}
                        {!startDate && endDate && `Showing data up to ${new Date(endDate).toLocaleDateString()}`}
                    </div>
                )}
            </div>

            {/* Stat Cards */}
            {overallLoading ? (
                <LoadingSpinner size="lg" message="Loading statistics..." />
            ) : overallStats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Income"
                        value={`$${overallStats.totalIncome.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}`}
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        }
                        color="green"
                    />
                    <StatCard
                        title="Total Expenses"
                        value={`$${overallStats.totalExpenses.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}`}
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        }
                        color="red"
                    />
                    <StatCard
                        title="Current Balance"
                        value={`$${overallStats.balance.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}`}
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        }
                        color={getBalanceColor(overallStats.balance)}
                    />
                    <StatCard
                        title="Transactions"
                        value={overallStats.transactionCount.toLocaleString()}
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                />
                            </svg>
                        }
                        color="purple"
                    />
                </div>
            ) : null}

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Monthly Trend Chart */}
                <div>
                    {monthlyLoading ? (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <LoadingSpinner size="md" message="Loading monthly trend..." />
                        </div>
                    ) : monthlyStats ? (
                        <MonthlyTrendChart data={monthlyStats} />
                    ) : null}
                </div>

                {/* Category Breakdown Chart */}
                <div>
                    {categoryLoading ? (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <LoadingSpinner size="md" message="Loading category breakdown..." />
                        </div>
                    ) : categoryStats ? (
                        <CategoryBreakdownChart data={categoryStats} />
                    ) : null}
                </div>
            </div>

            {/* Info Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                    <svg
                        className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <div className="text-sm text-blue-800">
                        <strong>Dashboard Overview:</strong> View your financial summary with income, expenses, and
                        balance. Use the date range filter to analyze specific periods. The monthly trend shows your
                        financial patterns over time, while the category breakdown helps you understand where your money
                        goes.
                    </div>
                </div>
            </div>
        </div>
    );
}
