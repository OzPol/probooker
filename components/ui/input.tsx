// ../components/ui/input.tsx
import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return <input ref={ref} {...props} className="w-full p-2 border rounded" />;
});

Input.displayName = 'Input';

export { Input };
