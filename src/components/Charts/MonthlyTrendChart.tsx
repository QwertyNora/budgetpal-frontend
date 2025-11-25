import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MonthlyStatisticsDto } from "../../types/types";

interface MonthlyTrendChartProps {
    data: MonthlyStatisticsDto[];
}

export default function MonthlyTrendChart({ data }: MonthlyTrendChartProps) {
    // Transform data for recharts
    const chartData = data.map(item => ({
        month: `${item.year}-${String(item.month).padStart(2, "0")}`,
        monthName: new Date(item.year, item.month - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        income: item.totalIncome,
        expenses: item.totalExpenses,
        balance: item.balance,
    }));

    if (chartData.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trend</h3>
                <div className="flex items-center justify-center h-64 text-gray-500">No monthly data available</div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="monthName" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={value => `$${value.toLocaleString()}`} />
                    <Tooltip
                        formatter={(value: number) =>
                            `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        }
                        labelStyle={{ fontWeight: "bold" }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Income"
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="#ef4444"
                        strokeWidth={2}
                        name="Expenses"
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="balance"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Balance"
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        strokeDasharray="5 5"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
