// pages/api/bookings/update.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { databases } from '../../../lib/appwrite.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { bookingId, status, reason } = req.body;
    try {
      await databases.updateDocument(
        process.env.DATABASE_ID!,
        process.env.BOOKING_COLLECTION_ID!,
        bookingId,
        { status, reason }
      );
      res.status(200).json({ message: 'Booking status updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update booking' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
