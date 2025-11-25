import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CategoryStatisticsDto } from "../../types/types";

interface CategoryBreakdownChartProps {
    data: CategoryStatisticsDto[];
}

const COLORS = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#6366f1",
    "#14b8a6",
    "#a855f7",
    "#eab308",
    "#22c55e",
    "#f43f5e",
];

export default function CategoryBreakdownChart({ data }: CategoryBreakdownChartProps) {
    // Transform data for recharts and filter out categories with zero total
    const chartData = data
        .filter(item => item.totalAmount > 0)
        .map(item => ({
            name: item.categoryName,
            value: item.totalAmount,
            transactionCount: item.transactionCount,
        }))
        .sort((a, b) => b.value - a.value); // Sort by amount descending

    if (chartData.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
                <div className="flex items-center justify-center h-64 text-gray-500">No category data available</div>
            </div>
        );
    }

    const renderCustomLabel = (entry: any) => {
        const percent = ((entry.value / chartData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1);
        return `${percent}%`;
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number, name: string, props: any) => [
                            `$${value.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })} (${props.payload.transactionCount} transactions)`,
                            name,
                        ]}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={value => {
                            const item = chartData.find(d => d.name === value);
                            return `${value} ($${item?.value.toLocaleString() || 0})`;
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>

            {/* Category List */}
            <div className="mt-6 space-y-2 max-h-48 overflow-y-auto">
                {chartData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="font-medium text-gray-700">{item.name}</span>
                            <span className="text-gray-500">({item.transactionCount})</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                            $
                            {item.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
