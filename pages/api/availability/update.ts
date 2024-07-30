// pages/api/availability/update.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { databases } from '../../../lib/appwrite.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, availableDates } = req.body;
    try {
      const response = await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_AVAILABILITY_COLLECTION_ID!,
        userId,
        { availableDates }
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update availability' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
