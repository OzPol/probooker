import React from 'react';
import { Button } from './ui/button';

interface SubmitButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, className, children }) => {
  return (
    <Button type="submit" disabled={isLoading} className={className || 'bg-blue-500 text-white py-2 px-4 rounded'}>
      {isLoading ? 'Loading...' : children}
    </Button>
  );
};

export default SubmitButton;
