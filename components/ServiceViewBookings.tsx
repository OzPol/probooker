// components/ServiceViewBookings.tsx
import React, { useEffect, useState } from 'react';
import { Booking } from '../types/appwrite.type';
import { databases } from '../lib/appwrite.config';
import * as sdk from 'node-appwrite';

const ServiceViewBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const userId = JSON.parse(localStorage.getItem('appwriteSession') || '{}').userId;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.DATABASE_ID!,
          process.env.BOOKING_COLLECTION_ID!,
          [sdk.Query.equal('providerId', userId)]
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

  const handleApproval = async (bookingId: string, status: string) => {
    const reason = prompt('Please provide a reason for this decision:');
    if (!reason) {
      alert('A reason is required.');
      return;
    }
    try {
      const response = await fetch(`/api/bookings/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId, status, reason }),
      });

      if (response.ok) {
        alert('Booking status updated.');
        setBookings(bookings.map(b => b.bookingId === bookingId ? { ...b, status } : b));
      } else {
        console.error('Failed to update booking.');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

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
            {booking.status === 'pending' && (
              <div>
                <button
                  onClick={() => handleApproval(booking.bookingId, 'approved')}
                  className="bg-green-500 text-white py-2 px-4 rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproval(booking.bookingId, 'rejected')}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default ServiceViewBookings;
