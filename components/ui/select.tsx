// ../components/ui/select.tsx

import React, { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ children, ...props }, ref) => {
    return (
        <select ref={ref} {...props} className="w-full p-2 border rounded">
        {children}
        </select>
    );
});

Select.displayName = 'Select';

export { Select };

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const SelectItem: React.FC<SelectItemProps> = ({ children, ...props }) => {
    return <option {...props}>{children}</option>;
};

export { SelectItem };
