import { useState } from "react";
import { useTransactions, useDeleteTransaction } from "../hooks/useTransactions";
import TransactionList from "../components/TransactionList";
import TransactionModal from "../components/TransactionModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import ConfirmDialog from "../components/ConfirmDialog";
import { TransactionDto } from "../types/types";

export default function Transactions() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(20);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState<TransactionDto | undefined>(undefined);

    const { data, isLoading, error, refetch } = useTransactions(pageNumber, pageSize);
    const deleteMutation = useDeleteTransaction();

    const handleEdit = (transaction: TransactionDto) => {
        setTransactionToEdit(transaction);
        setShowModal(true);
    };

    const handleDeleteClick = (id: number) => {
        setTransactionToDelete(id);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        if (transactionToDelete) {
            try {
                await deleteMutation.mutateAsync(transactionToDelete);
                setShowDeleteConfirm(false);
                setTransactionToDelete(null);
            } catch (error) {
                console.error("Failed to delete transaction:", error);
            }
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
        setTransactionToDelete(null);
    };

    const handleNewTransaction = () => {
        setTransactionToEdit(undefined);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setTransactionToEdit(undefined);
    };

    const handlePreviousPage = () => {
        setPageNumber(prev => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        if (data?.hasNext) {
            setPageNumber(prev => prev + 1);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <LoadingSpinner size="lg" message="Loading transactions..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <ErrorMessage error={error} title="Error loading transactions" onRetry={() => refetch()} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
                    <p className="text-gray-600 mt-1">Manage your income and expenses</p>
                </div>
                <button
                    onClick={handleNewTransaction}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    + New Transaction
                </button>
            </div>

            {/* Pagination Info */}
            {data && (
                <div className="mb-4 text-sm text-gray-600">
                    Showing page {data.pageNumber} of {data.totalPages} ({data.totalCount} total transactions)
                </div>
            )}

            {/* Transaction List */}
            {data && <TransactionList transactions={data.data} onEdit={handleEdit} onDelete={handleDeleteClick} />}

            {/* Pagination Controls */}
            {data && data.totalPages > 1 && (
                <div className="mt-6 flex justify-between items-center">
                    <button
                        onClick={handlePreviousPage}
                        disabled={!data.hasPrevious}
                        className={`px-4 py-2 rounded-lg font-medium ${
                            data.hasPrevious
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        Previous
                    </button>

                    <span className="text-gray-600">
                        Page {data.pageNumber} of {data.totalPages}
                    </span>

                    <button
                        onClick={handleNextPage}
                        disabled={!data.hasNext}
                        className={`px-4 py-2 rounded-lg font-medium ${
                            data.hasNext
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Transaction Modal */}
            <TransactionModal isOpen={showModal} onClose={handleModalClose} transaction={transactionToEdit} />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showDeleteConfirm}
                title="Confirm Delete"
                message="Are you sure you want to delete this transaction? This action cannot be undone."
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                isLoading={deleteMutation.isPending}
                variant="danger"
            />
        </div>
    );
}
