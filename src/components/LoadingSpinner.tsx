interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg" | "xl";
    message?: string;
}

export default function LoadingSpinner({ size = "md", message }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "h-6 w-6 border-2",
        md: "h-10 w-10 border-3",
        lg: "h-16 w-16 border-4",
        xl: "h-24 w-24 border-4",
    };

    return (
        <div className="flex flex-col items-center justify-center py-8">
            <div
                className={`${sizeClasses[size]} border-blue-600 border-t-transparent rounded-full animate-spin`}
                role="status"
                aria-label="Loading"
            />
            {message && <p className="mt-4 text-gray-600 text-center">{message}</p>}
        </div>
    );
}
