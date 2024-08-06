// components/CustomerViewBookings.tsx
import React, { useEffect, useState } from 'react';
import { Booking } from '../types/appwrite.type';
import { databases } from '../lib/appwrite.config';
import * as sdk from 'node-appwrite';

const CustomerViewBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const userId = JSON.parse(localStorage.getItem('appwriteSession') || '{}').userId;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.DATABASE_ID!,
          process.env.BOOKING_COLLECTION_ID!,
          [sdk.Query.equal('consumerId', userId)]
        );

        const bookingsData: Booking[] = response.documents.map((doc: sdk.Models.Document) => ({
          $id: doc.$id,
          $permissions: doc.$permissions,
          bookingId: doc.$id,
          $collectionId: doc.$collectionId,
          $databaseId: doc.$databaseId,
          $createdAt: doc.$createdAt,
          $updatedAt: doc.$updatedAt,
          consumerId: doc.consumerId,
          providerId: doc.providerId,
          serviceId: doc.serviceId,
          date: new Date(doc.date),
          status: doc.status,
          address: doc.address,
          city: doc.city,
          state: doc.state,
          zipcode: doc.zipcode,
        }));

        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">View Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.bookingId} className="mb-4 p-4 border rounded shadow">
            <p><strong>Service:</strong> {booking.serviceId}</p>
            <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Address:</strong> {booking.address}, {booking.city}, {booking.state}, {booking.zipcode}</p>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default CustomerViewBookings;
