interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
    variant?: "danger" | "warning" | "info";
}

export default function ConfirmDialog({
    isOpen,
    title,
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    isLoading = false,
    variant = "danger",
}: ConfirmDialogProps) {
    if (!isOpen) return null;

    const variantStyles = {
        danger: {
            button: "bg-red-600 hover:bg-red-700",
            icon: "text-red-600",
            iconBg: "bg-red-100",
        },
        warning: {
            button: "bg-amber-600 hover:bg-amber-700",
            icon: "text-amber-600",
            iconBg: "bg-amber-100",
        },
        info: {
            button: "bg-blue-600 hover:bg-blue-700",
            icon: "text-blue-600",
            iconBg: "bg-blue-100",
        },
    };

    const styles = variantStyles[variant];

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
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    onClick={!isLoading ? onCancel : undefined}
                ></div>

                {/* Center modal */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-6 pt-6 pb-4">
                        {/* Icon and Title */}
                        <div className="flex items-start">
                            <div
                                className={`flex-shrink-0 mx-auto sm:mx-0 flex items-center justify-center h-12 w-12 rounded-full ${styles.iconBg}`}
                            >
                                {variant === "danger" && (
                                    <svg
                                        className={`h-6 w-6 ${styles.icon}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                )}
                                {variant === "warning" && (
                                    <svg
                                        className={`h-6 w-6 ${styles.icon}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                )}
                                {variant === "info" && (
                                    <svg
                                        className={`h-6 w-6 ${styles.icon}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div className="mt-0 ml-4 text-left flex-1">
                                <h3 className="text-lg leading-6 font-semibold text-gray-900" id="modal-title">
                                    {title}
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-600">{message}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse gap-3">
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`w-full sm:w-auto inline-flex justify-center rounded-lg border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed ${styles.button}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                confirmLabel
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isLoading}
                            className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {cancelLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
