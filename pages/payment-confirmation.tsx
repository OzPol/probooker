// pages/payment-confirmation.tsx
// This is the Payment Confirmation Page
// A page to display the payment confirmation details
// This page is only accessible to logged in users.

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { databases } from '../lib/appwrite.config';
import { Models } from 'node-appwrite';

const PaymentConfirmation = () => {
  const router = useRouter();
  const { bookingId } = router.query;
  const [bookingDetails, setBookingDetails] = useState<Models.Document | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (bookingId) {
        try {
          const booking = await databases.getDocument(
            process.env.DATABASE_ID!,
            process.env.BOOKING_COLLECTION_ID!,
            bookingId as string
          );
          setBookingDetails(booking);
        } catch (error) {
          console.error('Error fetching booking details:', error);
        }
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (!bookingDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <main className="w-full p-8">
        <h1 className="text-2xl font-bold mb-6">Payment Confirmation</h1>
        <p>Booking ID: {bookingDetails.$id}</p>
        <p>Amount: ${bookingDetails.servicePrice - bookingDetails.discount}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
        >
          Back to Home
        </button>
      </main>
    </div>
  );
};

export default PaymentConfirmation;
