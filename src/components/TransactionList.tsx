import { TransactionDto } from "../types/types";
import { formatDate } from "../utils/date";
import { formatCurrency } from "../utils/format";
import { getTransactionTypeColor, getTransactionTypeBadgeColor } from "../types/helpers";
import EmptyState from "./EmptyState";

interface TransactionListProps {
    transactions: TransactionDto[];
    onEdit: (transaction: TransactionDto) => void;
    onDelete: (id: number) => void;
}

export default function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
    if (transactions.length === 0) {
        return (
            <EmptyState
                message="No transactions yet"
                description="Start tracking your finances by creating your first transaction!"
                icon={
                    <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                }
            />
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map(transaction => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatDate(transaction.date)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                <div className="font-medium">{transaction.description}</div>
                                {transaction.notes && (
                                    <div className="text-gray-500 text-xs mt-1">{transaction.notes}</div>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {transaction.categoryName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                                <span className={getTransactionTypeColor(transaction.type)}>
                                    {formatCurrency(transaction.amount)}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getTransactionTypeBadgeColor(
                                        transaction.type
                                    )}`}
                                >
                                    {transaction.type === 0 ? "Income" : "Expense"}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => onEdit(transaction)}
                                    className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-150 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(transaction.id)}
                                    className="text-red-600 hover:text-red-900 transition-colors duration-150 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
