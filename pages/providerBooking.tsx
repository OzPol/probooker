import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import BookingForm from '../components/BookingForm';
import { fetchProviderAvailability } from '../lib/availability.actions';

const ProviderBooking = () => {
  const router = useRouter();
  const { providerId, serviceId } = router.query;
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (providerId) {
        const dates = await fetchProviderAvailability(providerId as string);
        setAvailableDates(dates.map((dateStr: string) => new Date(dateStr)));
      }
    };

    fetchAvailability();
  }, [providerId]);

  if (!providerId || !serviceId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen provider-background">
      <main className="w-full p-8 content-background">
        <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>
        <AvailabilityCalendar availableDates={availableDates} />
        <BookingForm providerId={providerId as string} serviceId={serviceId as string} selectedDate={new Date()} />
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
