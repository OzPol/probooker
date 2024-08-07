import React, { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface AvailabilityCalendarProps {
  availableDates: Date[];
  onDateChange?: (date: Date) => void;
  isProvider?: boolean;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ availableDates, onDateChange, isProvider }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (availableDates.length > 0) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates]);

  const isAvailable = (date: Date) => {
    return availableDates.some(availableDate => availableDate.toDateString() === date.toDateString());
  };

  const handleDateChange: CalendarProps['onChange'] = (date) => {
    if (date instanceof Date) {
      setSelectedDate(date);
      if (onDateChange) onDateChange(date);
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Check Availability</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date }) => (isAvailable(date) ? 'bg-green-500 text-white' : '')}
      />
      {selectedDate && (
        <p className="mt-4">
          Selected Date: {selectedDate.toDateString()}
        </p>
      )}
    </div>
  );
};

export default AvailabilityCalendar;
