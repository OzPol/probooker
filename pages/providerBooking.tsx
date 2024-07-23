// pages/providerBooking.tsx

'use client'

import React from 'react';
import { useRouter } from 'next/router';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import BookingForm from '../components/BookingForm';

const ProviderBooking = () => {
  const router = useRouter();
  
  const availableDates = [
    new Date(), // need to add available dates here somehow, from DB ? 
    // new Date('2024-08-01'),
  ];

  return (
    <div className="flex min-h-screen provider-background">
      <main className="w-full p-8 content-background">
        <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>
        <AvailabilityCalendar availableDates={availableDates} />
        <BookingForm />
        <button
          onClick={() => router.push('/serviceProfile')}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Back to Profile
        </button>
      </main>
    </div>
  );
};

export default ProviderBooking;
