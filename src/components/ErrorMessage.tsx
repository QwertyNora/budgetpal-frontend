import { ApiError } from "../types/types";
import { isApiError } from "../types/helpers";

interface ErrorMessageProps {
    error: string | Error | ApiError | unknown;
    onRetry?: () => void;
    title?: string;
}

export default function ErrorMessage({ error, onRetry, title = "Error" }: ErrorMessageProps) {
    // Extract error details
    const errorMessage = isApiError(error)
        ? error.message
        : error instanceof Error
        ? error.message
        : typeof error === "string"
        ? error
        : "An unexpected error occurred";

    const errorDetails = isApiError(error) && error.errors.length > 0 ? error.errors : null;

    return (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <div className="flex items-start">
                {/* Error Icon */}
                <div className="flex-shrink-0">
                    <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                {/* Error Content */}
                <div className="ml-3 flex-1">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">{title}</h3>
                    <p className="text-red-700 mb-3">{errorMessage}</p>

                    {/* Error Details List */}
                    {errorDetails && (
                        <div className="mt-3 bg-red-100 rounded-md p-3">
                            <p className="text-sm font-medium text-red-800 mb-2">Details:</p>
                            <ul className="list-disc list-inside space-y-1">
                                {errorDetails.map((detail, index) => (
                                    <li key={index} className="text-sm text-red-700">
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Retry Button */}
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm inline-flex items-center"
                        >
                            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
