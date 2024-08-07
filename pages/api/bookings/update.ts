// pages/api/bookings/update.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { databases } from '../../../lib/appwrite.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { bookingId, ...updatedBooking } = req.body;
    try {
      await databases.updateDocument(
        process.env.DATABASE_ID!,
        process.env.BOOKING_COLLECTION_ID!,
        bookingId,
        updatedBooking
      );
      res.status(200).json({ message: 'Booking updated successfully' });
    } catch (error) {
      console.error('Error updating booking:', error);
      res.status(500).json({ message: 'Error updating booking', error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
