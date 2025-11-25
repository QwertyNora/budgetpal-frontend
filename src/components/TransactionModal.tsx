import { useState, useEffect } from "react";
import TransactionForm from "./TransactionForm";
import { TransactionDto } from "../types/types";
import { CreateTransactionFormData } from "../types/validation";
import { useCreateTransaction, useUpdateTransaction } from "../hooks/useTransactions";

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction?: TransactionDto;
}

export default function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
    const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const createMutation = useCreateTransaction();
    const updateMutation = useUpdateTransaction();

    const isEditMode = !!transaction;

    // Handle escape key press
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen && !createMutation.isPending && !updateMutation.isPending) {
                handleClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, createMutation.isPending, updateMutation.isPending]);

    const handleSubmit = async (data: CreateTransactionFormData) => {
        try {
            if (isEditMode && transaction) {
                await updateMutation.mutateAsync({
                    id: transaction.id,
                    data,
                });
                setNotification({
                    type: "success",
                    message: "Transaction updated successfully!",
                });
            } else {
                await createMutation.mutateAsync(data);
                setNotification({
                    type: "success",
                    message: "Transaction created successfully!",
                });
            }

            // Close modal after a brief delay to show success message
            setTimeout(() => {
                setNotification(null);
                onClose();
            }, 1500);
        } catch (error: any) {
            const errorMessage = error?.message || "An error occurred. Please try again.";
            setNotification({
                type: "error",
                message: errorMessage,
            });
        }
    };

    const handleClose = () => {
        setNotification(null);
        onClose();
    };

    if (!isOpen) return null;

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            {/* Background overlay */}
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300"
                    aria-hidden="true"
                    onClick={handleClose}
                ></div>

                {/* Center modal */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all duration-300 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    {/* Modal Header */}
                    <div className="bg-white px-6 pt-5 pb-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-900" id="modal-title">
                                {isEditMode ? "Edit Transaction" : "Create Transaction"}
                            </h3>
                            <button
                                onClick={handleClose}
                                disabled={isSubmitting}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none disabled:opacity-50"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Notification */}
                        {notification && (
                            <div
                                className={`mb-4 p-3 rounded-lg ${
                                    notification.type === "success"
                                        ? "bg-green-50 text-green-800 border border-green-200"
                                        : "bg-red-50 text-red-800 border border-red-200"
                                }`}
                            >
                                <div className="flex items-center">
                                    {notification.type === "success" ? (
                                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                    <span className="text-sm font-medium">{notification.message}</span>
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <TransactionForm
                            transaction={transaction}
                            onSubmit={handleSubmit}
                            onCancel={handleClose}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
