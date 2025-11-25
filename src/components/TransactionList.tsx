import { TransactionDto } from "../types/types";
import { formatDate } from "../utils/date";
import { formatCurrency } from "../utils/format";
import { getTransactionTypeColor, getTransactionTypeBadgeColor } from "../types/helpers";

interface TransactionListProps {
    transactions: TransactionDto[];
    onEdit: (transaction: TransactionDto) => void;
    onDelete: (id: number) => void;
}

export default function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
    if (transactions.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No transactions found. Create your first transaction to get started!
            </div>
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
                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(transaction.id)}
                                    className="text-red-600 hover:text-red-900"
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
