interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: "green" | "red" | "blue" | "purple" | "amber";
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
    const colorClasses = {
        green: "bg-green-50 border-green-200 text-green-700",
        red: "bg-red-50 border-red-200 text-red-700",
        blue: "bg-blue-50 border-blue-200 text-blue-700",
        purple: "bg-purple-50 border-purple-200 text-purple-700",
        amber: "bg-amber-50 border-amber-200 text-amber-700",
    };

    const iconColorClasses = {
        green: "bg-green-100 text-green-600",
        red: "bg-red-100 text-red-600",
        blue: "bg-blue-100 text-blue-600",
        purple: "bg-purple-100 text-purple-600",
        amber: "bg-amber-100 text-amber-600",
    };

    return (
        <div className={`rounded-lg border-2 p-6 shadow-sm ${colorClasses[color]}`}>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium opacity-80 mb-2">{title}</p>
                    <p className="text-3xl font-bold">{value}</p>
                </div>
                <div className={`rounded-full p-3 ${iconColorClasses[color]}`}>{icon}</div>
            </div>
        </div>
    );
}
