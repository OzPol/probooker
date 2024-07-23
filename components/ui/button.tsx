// ../components/ui/button.tsx
// used in SubmitButton.tsx component
import React, { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    children: React.ReactNode;
    className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ isLoading, children, className, ...props }, ref) => {
    return (
        <button
        ref={ref}
        {...props}
        className={`${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading || props.disabled}
    >
        {isLoading ? 'Loading...' : children}
        </button>
    );
});

Button.displayName = 'Button';

export { Button };

