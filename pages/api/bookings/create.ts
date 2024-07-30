// This API endpoint is used to create a new booking document in the database.
// ./pages/api/bookings/create.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { databases } from '../../../lib/appwrite.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      const response = await databases.createDocument(
        process.env.DATABASE_ID!,
        process.env.BOOKINGS_COLLECTION_ID!,
        'unique()',
        data
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Booking creation failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
