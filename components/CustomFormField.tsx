// ../components/CustomFormField.tsx

import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectItem } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { DateInput } from './ui/date-picker';

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  DATE_PICKER = 'datePicker',
  CHECKBOX = 'checkbox',
}

interface CustomFormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  fieldType: FormFieldType;
  placeholder?: string;
  options?: string[];
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
}

const CustomFormField: React.FC<CustomFormFieldProps> = ({
  control,
  name,
  label,
  fieldType,
  placeholder,
  options,
  disabled,
  dateFormat,
  showTimeSelect,
}) => {
  const renderField = (field: any) => {
    switch (fieldType) {
      case FormFieldType.INPUT:
        return <Input {...field} placeholder={placeholder} disabled={disabled} />;
      case FormFieldType.TEXTAREA:
        return <Textarea {...field} placeholder={placeholder} disabled={disabled} />;
      case FormFieldType.SELECT:
        return (
          <Select {...field} disabled={disabled}>
            {options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>
        );
      case FormFieldType.DATE_PICKER:
        return (
          <DateInput
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            showTimeSelect={showTimeSelect}
            dateFormat={dateFormat || 'MM/dd/yyyy'}
            disabled={disabled}
          />
        );
      case FormFieldType.CHECKBOX:
        return <Checkbox {...field} disabled={disabled} />;
      default:
        return <div></div>; // Replace null with a default component
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => renderField(field)}
      />
    </div>
  );
};

export default CustomFormField;

