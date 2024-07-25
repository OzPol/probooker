// ../components/ui/checkbox.tsx

import React, { InputHTMLAttributes, forwardRef } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ ...props }, ref) => {
    return <input ref={ref} type="checkbox" {...props} className="mr-2" />;
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
