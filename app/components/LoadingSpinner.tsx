import React from 'react';

interface LoadingSpinnerProps {
    message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
    return (
        <div className="py-20 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent shadow-lg"></div>
            {message && (
                <p className="mt-6 text-lg font-medium text-gray-600 animate-pulse">{message}</p>
            )}
        </div>
    );
};
