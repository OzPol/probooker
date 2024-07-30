// components/ProviderSetAvailability.tsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { databases } from '../lib/appwrite.config';
import { useRouter } from 'next/router';

const ProviderSetAvailability = () => {
  const [selectedDates, setSelectedDates] = useState<{ date: Date; times: string[] }[]>([]);
  const [newDate, setNewDate] = useState<Date | null>(null);
  const [newTime, setNewTime] = useState<string>('');
  const router = useRouter();
  const session = JSON.parse(localStorage.getItem('appwriteSession') || '{}');
  const providerId = session.userId;

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE_ID!,
          process.env.NEXT_PUBLIC_AVAILABILITY_COLLECTION_ID!,
          [`providerId=${providerId}`]
        );
        if (response.documents.length > 0) {
          const availability = response.documents[0].availableDates.map((d: { date: string; times: string[] }) => ({
            date: new Date(d.date),
            times: d.times,
          }));
          setSelectedDates(availability);
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    fetchAvailability();
  }, [providerId]);

  const handleAddDate = () => {
    if (newDate && newTime) {
      const existingDate = selectedDates.find(d => d.date.toDateString() === newDate.toDateString());
      if (existingDate) {
        existingDate.times.push(newTime);
      } else {
        setSelectedDates([...selectedDates, { date: newDate, times: [newTime] }]);
      }
      setNewDate(null);
      setNewTime('');
    }
  };

  const handleSave = async () => {
    try {
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_AVAILABILITY_COLLECTION_ID!,
        providerId,
        { availableDates: selectedDates.map(d => ({ date: d.date.toISOString(), times: d.times })) }
      );
      console.log('Availability saved successfully');
      router.push('/providerProfile');
    } catch (error) {
      console.error('Error saving availability:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Set Your Availability</h2>
      <div className="mb-4">
        <DatePicker
          selected={newDate}
          onChange={date => setNewDate(date as Date)}
          dateFormat="MMMM d, yyyy"
          className="border p-2 rounded"
        />
        <input
          type="time"
          value={newTime}
          onChange={e => setNewTime(e.target.value)}
          className="border p-2 rounded ml-2"
        />
        <button
          onClick={handleAddDate}
          className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
        >
          Add
        </button>
      </div>
      <div className="mb-4">
        {selectedDates.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-2">Selected Dates and Times:</h3>
            <ul>
              {selectedDates.map((d, idx) => (
                <li key={idx}>
                  {d.date.toDateString()}: {d.times.join(', ')}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Save Availability
      </button>
    </div>
  );
};

export default ProviderSetAvailability;
