// ./pages/api/bookings/create.ts
// This API endpoint is used to create a new booking in the database
// It receives the booking details as a request body
// It uses the appwrite sdk to create a new booking document in the database
// It returns the new booking id as a response
// It returns an error if the booking creation fails
// Availability is an array of objects with date, startTime, and endTime
// It uses the appwrite sdk to update the availability in the database

// ./pages/api/bookings/create.ts
// ./pages/api/bookings/create.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { databases } from '../../../lib/appwrite.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { date, consumerId, providerId, serviceId, address, city, state, zipcode } = req.body;

      // Create a new booking document in Appwrite
      const newBooking = await databases.createDocument(
        process.env.DATABASE_ID!,
        process.env.BOOKING_COLLECTION_ID!,
        'unique()',
        {
          consumerId,
          providerId,
          serviceId,
          date,
          status: 'confirmed',  // Set status to 'confirmed'
          address,
          city,
          state,
          zipcode,
        }
      );

      // Return the new booking ID
      res.status(200).json({ bookingId: newBooking.$id });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ message: 'Error creating booking', error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
