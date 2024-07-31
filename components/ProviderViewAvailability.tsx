// components/ProviderViewAvailability.tsx
// This component displays the availability slots of a provider.
// The component fetches the availability slots from the Appwrite database and displays them in a table.
// The component is used in the ProviderProfile page. 
// It also uses the date-fns library for date formatting.

'use client';

import React, { useEffect, useState } from 'react';
import { databases } from '../lib/appwrite.config';
import { Availability } from '../types/appwrite.type';
import { format } from 'date-fns'; // Import date-fns for date formatting

const ProviderViewAvailability: React.FC = () => {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const session = JSON.parse(localStorage.getItem('appwriteSession') || '{}');
  const providerId = session.userId;

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.DATABASE_ID!,
          process.env.AVAILABILITY_COLLECTION_ID!
        );
        const allAvailability = response.documents as Availability[];
        const filteredAvailability = allAvailability.filter(doc => doc.providerId === providerId);
        setAvailability(filteredAvailability);
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    fetchAvailability();
  }, [providerId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">View Your Availability</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Start Time</th>
              <th className="py-2 px-4 border-b">End Time</th>
              <th className="py-2 px-4 border-b">Recurring</th>
            </tr>
          </thead>
          <tbody>
            {availability.length > 0 ? (
              availability.map((slot, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-4 border-b">{format(new Date(slot.date), 'EEE MMM dd yyyy')}</td>
                  <td className="py-2 px-4 border-b">{format(new Date(slot.startTime), 'hh:mm a')}</td>
                  <td className="py-2 px-4 border-b">{format(new Date(slot.endTime), 'hh:mm a')}</td>
                  <td className="py-2 px-4 border-b">{slot.recurring ? 'Yes' : 'No'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border-b" colSpan={4}>No availability set.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderViewAvailability;
