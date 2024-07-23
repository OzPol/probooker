import { databases, DATABASE_ID, BOOKING_COLLECTION_ID } from './appwrite.config';
import { ID } from 'node-appwrite';

export const createBooking = async (booking: any) => {
  try {
    const newBooking = await databases.createDocument(
      DATABASE_ID!,
      BOOKING_COLLECTION_ID!,
      ID.unique(),
      booking
    );
    return newBooking;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

const parseStringify = (data: any) => {
  return data.map((doc: any) => ({
    ...doc,
    $id: doc.$id,
    ...doc.fields,
  }));
};

export const getBookings = async (userId: string) => {
  try {
    const bookings = await databases.listDocuments(
      DATABASE_ID!,
      BOOKING_COLLECTION_ID!,
      []
    );
    return parseStringify(bookings.documents);
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
};
