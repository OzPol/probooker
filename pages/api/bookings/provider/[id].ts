// This API endpoint is used to fetch all bookings of a provider by providerId
// ./pages/api/bookings/provider/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { databases } from '../../../../lib/appwrite.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'GET') {
    try {
      const response = await databases.listDocuments(
        process.env.DATABASE_ID!,
        process.env.BOOKINGS_COLLECTION_ID!,
        [`providerId=${id}`]
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
