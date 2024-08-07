// pages/api/availability/update.ts
// This API endpoint is used to update the availability of a provider
// It receives the userId and availability as a request body
// It uses the appwrite sdk to update the availability in the database

import { NextApiRequest, NextApiResponse } from 'next';
import { databases } from '../../../lib/appwrite.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, availability } = req.body; // Availability is an array of objects with date, startTime, and endTime
    try {
      const promises = availability.map(async (slot: any) => {
        await databases.createDocument(
          process.env.DATABASE_ID!,
          process.env.AVAILABILITY_COLLECTION_ID!,
          'unique()',
          { userId, ...slot }
        );
      });
      await Promise.all(promises);
      res.status(200).json({ message: 'Availability updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update availability' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
