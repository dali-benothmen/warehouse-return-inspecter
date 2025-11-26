import React from 'react';

interface AlertProps {
    title: string;
    message: string;
    icon?: string;
}

export const Alert: React.FC<AlertProps> = ({
    title,
    message,
    icon = '⚠️'
}) => {
    return (
        <div className="mt-6 p-6 bg-red-50 border border-red-100 rounded-2xl shadow-sm animate-fade-in">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{icon}</span>
                </div>
                <div>
                    <h3 className="font-bold text-red-900 text-lg mb-1">{title}</h3>
                    <p className="text-red-700">{message}</p>
                </div>
            </div>
        </div>
    );
};
