// components/ProviderSetAvailability.tsx
// This component allows a service provider to set their availability by adding dates 
// and times when they are available to provide services.
// The component fetches the existing availability from the Appwrite database and allows
// the provider to add new availability slots.
// The provider can save the availability slots to the database.
// The component also displays the existing availability slots.

'use client';

import React, { useState, useEffect } from 'react';
import { databases } from '../lib/appwrite.config';
import { useRouter } from 'next/router';
import { Availability } from '../types/appwrite.type';

const ProviderSetAvailability: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<Availability[]>([]);
  const [newDate, setNewDate] = useState<Date | null>(null);
  const [newStartTime, setNewStartTime] = useState<string>('');
  const [newEndTime, setNewEndTime] = useState<string>('');
  const [recurring, setRecurring] = useState(false);
  const router = useRouter();
  const session = JSON.parse(localStorage.getItem('appwriteSession') || '{}');
  const providerId = session.userId;
  const serviceProvider = session.name; // had to make this not required in the Appwrite DB

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.DATABASE_ID!,
          process.env.AVAILABILITY_COLLECTION_ID!
        );
        const allAvailability = response.documents as Availability[];
        const filteredAvailability = allAvailability.filter(doc => doc.providerId === providerId);
        setSelectedDates(filteredAvailability);
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    fetchAvailability();
  }, [providerId]);

  const handleAddDate = () => {
    if (newDate && newStartTime && newEndTime) {
      setSelectedDates([
        ...selectedDates,
        {
          $id: '',
          $collectionId: '',
          $databaseId: '',
          $createdAt: '',
          $updatedAt: '',
          $permissions: [] as string[],
          date: newDate.toISOString(),
          startTime: newStartTime,
          endTime: newEndTime,
          recurring,
          providerId,
          serviceProvider
        }
      ]);
      setNewDate(null);
      setNewStartTime('');
      setNewEndTime('');
    }
  };

  const handleDeleteDate = (index: number) => {
    const updatedDates = selectedDates.filter((_, i) => i !== index);
    setSelectedDates(updatedDates);
  };

  const handleSave = async () => {
    try {
      const existingDocs = await databases.listDocuments(
        process.env.DATABASE_ID!,
        process.env.AVAILABILITY_COLLECTION_ID!
      );

      // Delete existing availability for the provider
      for (const doc of existingDocs.documents) {
        if (doc.providerId === providerId) {
          await databases.deleteDocument(process.env.DATABASE_ID!, process.env.AVAILABILITY_COLLECTION_ID!, doc.$id);
        }
      }

      // Save new availability
      for (const slot of selectedDates) {
        await databases.createDocument(
          process.env.DATABASE_ID!,
          process.env.AVAILABILITY_COLLECTION_ID!,
          'unique()',
          {
            providerId: slot.providerId,
            serviceProvider: slot.serviceProvider,
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime,
            recurring: slot.recurring,
          }
        );
      }

      console.log('Availability saved successfully');
      router.push('/serviceProfile');
    } catch (error) {
      console.error('Error saving availability:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Set Your Availability</h2>
      <div className="mb-4">
        <input
          type="date"
          value={newDate ? newDate.toISOString().substring(0, 10) : ''}
          onChange={(e) => setNewDate(e.target.value ? new Date(e.target.value) : null)}
          className="border p-2 rounded"
        />
        <input
          type="time"
          value={newStartTime}
          onChange={(e) => setNewStartTime(e.target.value)}
          className="border p-2 rounded ml-2"
        />
        <input
          type="time"
          value={newEndTime}
          onChange={(e) => setNewEndTime(e.target.value)}
          className="border p-2 rounded ml-2"
        />
        <button onClick={handleAddDate} className="bg-blue-500 text-white py-2 px-4 rounded ml-2">
          Add
        </button>
      </div>
      <div className="mb-4">
        {selectedDates.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-2">Selected Dates and Times:</h3>
            <ul>
              {selectedDates.map((d, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  {new Date(d.date).toDateString()}: {d.startTime} - {d.endTime}
                  <button
                    onClick={() => handleDeleteDate(idx)}
                    className="ml-4 bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button onClick={handleSave} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Save Availability
      </button>
    </div>
  );
};

export default ProviderSetAvailability;