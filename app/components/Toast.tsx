"use client"

import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info';

type ToastProps = {
    message: string;
    type: ToastType;
    duration?: number;
    onClose: () => void;
};

export const Toast = ({ message, type, duration = 3000, onClose }: ToastProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
    }[type];

    const icon = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
    }[type];

    return (
        <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 min-w-[280px] max-w-[90vw] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
        >
            <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">{icon}</span>
                <span className="text-base font-medium">{message}</span>
            </div>
        </div>
    );
};

type ToastContainerProps = {
    toasts: Array<{ id: string; message: string; type: ToastType }>;
    onRemove: (id: string) => void;
};

export const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
    return (
        <>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => onRemove(toast.id)}
                />
            ))}
        </>
    );
};
