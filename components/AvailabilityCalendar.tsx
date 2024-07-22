// ./components/AvailabilityCalendar.tsx

import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AvailabilityCalendar = ({ availableDates }: { availableDates: Date[] }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const isAvailable = (date: Date) => {
    return availableDates.some(availableDate => availableDate.toDateString() === date.toDateString());
  };

  const handleDateChange: CalendarProps['onChange'] = (date, event) => {
    if (Array.isArray(date)) {
      setSelectedDate(date[0]);
    } else {
      setSelectedDate(date);
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
