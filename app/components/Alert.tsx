import React from 'react';

type AlertVariant = 'error' | 'success' | 'warning' | 'info';
type AlertSize = 'small' | 'medium' | 'large';

interface AlertProps {
    variant?: AlertVariant;
    size?: AlertSize;
    title?: string;
    message?: string;
    icon?: string | React.ReactNode;
    showIcon?: boolean;
    children?: React.ReactNode;
    className?: string;
}

const variantStyles = {
    error: {
        container: 'bg-red-50 border-red-100',
        iconBg: 'bg-red-100',
        title: 'text-red-900',
        message: 'text-red-700',
        icon: '⚠️',
    },
    success: {
        container: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100',
        iconBg: 'bg-green-100',
        title: 'text-green-800',
        message: 'text-green-600',
        icon: (
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        ),
    },
    warning: {
        container: 'bg-yellow-50 border-yellow-100',
        iconBg: 'bg-yellow-100',
        title: 'text-yellow-900',
        message: 'text-yellow-700',
        icon: '⚡',
    },
    info: {
        container: 'bg-blue-50 border-blue-100',
        iconBg: 'bg-blue-100',
        title: 'text-blue-900',
        message: 'text-blue-700',
        icon: 'ℹ️',
    },
};

const sizeStyles = {
    small: {
        container: 'p-4',
        icon: 'h-8 w-8',
        iconText: 'text-lg',
        gap: 'gap-3',
    },
    medium: {
        container: 'p-6',
        icon: 'h-12 w-12',
        iconText: 'text-2xl',
        gap: 'gap-4',
    },
    large: {
        container: 'py-12 px-6',
        icon: 'h-16 w-16',
        iconText: 'text-3xl',
        gap: 'gap-4',
    },
};

export const Alert: React.FC<AlertProps> = ({
    variant = 'error',
    size = 'medium',
    title,
    message,
    icon,
    showIcon = true,
    children,
    className = '',
}) => {
    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];

    const displayIcon = icon !== undefined ? icon : variantStyle.icon;

    const hasChildren = children !== undefined;

    return (
        <div
            className={`mt-6 border rounded-2xl shadow-sm animate-fade-in ${variantStyle.container} ${sizeStyle.container} ${className}`}
        >
            <div className={`flex items-center ${sizeStyle.gap} ${size === 'large' ? 'flex-col text-center' : ''}`}>
                {showIcon && (
                    <div
                        className={`${sizeStyle.icon} ${variantStyle.iconBg} rounded-full flex items-center justify-center flex-shrink-0 ${size === 'large' ? 'mb-4' : ''}`}
                    >
                        {typeof displayIcon === 'string' ? (
                            <span className={sizeStyle.iconText}>{displayIcon}</span>
                        ) : (
                            displayIcon
                        )}
                    </div>
                )}

                {hasChildren ? (
                    <div className={size === 'large' ? 'w-full' : 'flex-1'}>{children}</div>
                ) : (
                    <div className={size === 'large' ? 'w-full' : 'flex-1'}>
                        {title && (
                            <h3
                                className={`font-bold ${variantStyle.title} ${size === 'small' ? 'text-base mb-0.5' : size === 'large' ? 'text-2xl mb-2' : 'text-lg mb-1'
                                    }`}
                            >
                                {title}
                            </h3>
                        )}
                        {message && (
                            <p
                                className={`${variantStyle.message} ${size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'
                                    }`}
                            >
                                {message}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
