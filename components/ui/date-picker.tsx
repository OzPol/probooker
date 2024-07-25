// ../components/ui/date-picker.tsx

import React, { forwardRef } from 'react';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = forwardRef<DatePicker, DatePickerProps>(({ ...props }, ref) => {
    return <DatePicker {...props} ref={ref} className="w-full p-2 border rounded" />;
});

DateInput.displayName = 'DateInput';

export { DateInput };
