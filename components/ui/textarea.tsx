// ../components/textArea.tsx

import React, { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ ...props }, ref) => {
    return <textarea ref={ref} {...props} className="w-full p-2 border rounded" />;
});

Textarea.displayName = 'Textarea';

export { Textarea };

