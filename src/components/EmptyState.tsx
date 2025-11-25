import React from "react";

interface EmptyStateProps {
    message: string;
    description?: string;
    icon?: React.ReactNode;
    actionButton?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, description, icon, actionButton }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            {icon && <div className="mb-4 text-gray-400">{icon}</div>}
            <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
            {description && <p className="text-sm text-gray-500 text-center mb-6 max-w-md">{description}</p>}
            {actionButton && <div className="mt-2">{actionButton}</div>}
        </div>
    );
};

export default EmptyState;
