import React, { useState, useEffect } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface AvailabilityCalendarProps {
  availableDates: Date[];
  onDateChange?: (dates: Date[]) => void;
  isProvider?: boolean;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ availableDates, onDateChange, isProvider }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>(availableDates);

  useEffect(() => {
    setSelectedDates(availableDates);
  }, [availableDates]);

  const isAvailable = (date: Date) => {
    return selectedDates.some(selectedDate => selectedDate.toDateString() === date.toDateString());
  };

  const handleDateChange: CalendarProps['onChange'] = (date) => {
    if (Array.isArray(date)) {
      const newDates = date as Date[];
      setSelectedDates(newDates);
      if (onDateChange) onDateChange(newDates);
    } else if (date instanceof Date) {
      const newDates = selectedDates.includes(date)
        ? selectedDates.filter(d => d.toDateString() !== date.toDateString())
        : [...selectedDates, date];
      setSelectedDates(newDates);
      if (onDateChange) onDateChange(newDates);
    }
  };

  const formatValue = (dates: Date[]): Date | [Date, Date] | undefined => {
    if (dates.length === 0) {
      return undefined;
    }
    if (dates.length === 1) {
      return dates[0];
    }
    return [dates[0], dates[dates.length - 1]];
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Check Availability</h2>
      <Calendar
        selectRange={isProvider}
        onChange={handleDateChange}
        value={formatValue(selectedDates)}
        tileClassName={({ date }) => (isAvailable(date) ? 'bg-green-500 text-white' : '')}
      />
      {selectedDates.length > 0 && (
        <p className="mt-4">
          Selected Dates: {selectedDates.map(date => date.toDateString()).join(', ')}
        </p>
      )}
    </div>
  );
};

export default AvailabilityCalendar;
