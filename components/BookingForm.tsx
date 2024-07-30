// components/BookingForm.tsx
import React, { useState, useEffect } from 'react';
import { databases } from '../lib/appwrite.config';

interface BookingFormProps {
  providerId: string;
  serviceId: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ providerId, serviceId }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [userCredits, setUserCredits] = useState(0);

  useEffect(() => {
    const fetchUserCredits = async () => {
      const session = JSON.parse(localStorage.getItem('appwriteSession') || '{}');
      const customerId = session.userId;
      
      try {
        const user = await databases.getDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID!,
          process.env.NEXT_PUBLIC_CUSTOMER_COLLECTION_ID!,
          customerId
        );
        setUserCredits(user.credits);
      } catch (error) {
        console.error('Error fetching user credits:', error);
      }
    };

    fetchUserCredits();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const session = JSON.parse(localStorage.getItem('appwriteSession') || '{}');
    const customerId = session.userId;

    const servicePrice = 10; // Replace this with actual service price if needed

    if (userCredits < servicePrice) {
      alert('Insufficient credits');
      return;
    }

    const formData = {
      date,
      time,
      customerId,
      providerId,
      serviceId,
    };

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Booking created successfully.');
        const updatedCredits = userCredits - servicePrice;
        await databases.updateDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID!,
          process.env.NEXT_PUBLIC_CUSTOMER_COLLECTION_ID!,
          customerId,
          { credits: updatedCredits }
        );
        setUserCredits(updatedCredits);
      } else {
        console.error('Failed to create booking.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-1/2 sm:w-1/3 lg:w-1/4 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 block w-1/2 sm:w-1/3 lg:w-1/4 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
