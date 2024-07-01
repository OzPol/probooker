// components/FormattedDate.tsx
import React from 'react';
import { formatDate } from '../utils/formatDate';

const FormattedDate: React.FC<{ date: Date }> = ({ date }) => {
  return <span>{formatDate(date)}</span>;
};

export default FormattedDate;
