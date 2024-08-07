// lib/DataBookings.ts
import { databases } from '../lib/appwrite.config';
import { Booking } from '../types/appwrite.type';
import * as sdk from 'node-appwrite';

export const fetchCustomerBookings = async (consumerId: string): Promise<Booking[]> => {
  try {
    const response = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.BOOKINGS_COLLECTION_ID!,
      [sdk.Query.equal('consumerId', consumerId)]
    );
    return response.documents as Booking[];
  } catch (error) {
    console.error('Error fetching customer bookings:', error);
    return [];
  }
};

export const fetchProviderBookings = async (providerId: string): Promise<Booking[]> => {
  try {
    const response = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.BOOKINGS_COLLECTION_ID!,
      [sdk.Query.equal('providerId', providerId)]
    );
    return response.documents as Booking[];
  } catch (error) {
    console.error('Error fetching provider bookings:', error);
    return [];
  }
};
