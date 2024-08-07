// components/CustomerViewBookings.tsx
import React, { useEffect, useState } from 'react';
import { Booking } from '../types/appwrite.type';
import { databases } from '../lib/appwrite.config';
import * as sdk from 'node-appwrite';
import EditBookingForm from './EditBookingForm';

const CustomerViewBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const userId = JSON.parse(localStorage.getItem('appwriteSession') || '{}').userId;

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

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  const handleEditClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsEditing(true);
  };

  const handleDelete = async (bookingId: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      try {
        await databases.deleteDocument(
          process.env.DATABASE_ID!,
          process.env.BOOKING_COLLECTION_ID!,
          bookingId
        );
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.bookingId !== bookingId));
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    setSelectedBooking(null);
    await fetchBookings(); // Fetch the bookings again to get the updated list
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
            <div className="flex space-x-4">
              <button
                onClick={() => handleEditClick(booking)}
                className="bg-yellow-500 text-white py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(booking.bookingId)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
      {isEditing && selectedBooking && (
        <EditBookingForm booking={selectedBooking} onClose={() => setIsEditing(false)} onSave={handleSave} />
      )}
    </div>
  );
};

export default CustomerViewBookings;
