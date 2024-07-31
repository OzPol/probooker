// pages/api/availability/[userId].ts
// This API endpoint is used to fetch availability of a provider by userId
// It uses the appwrite sdk to fetch availability from the database 
// It returns the availability of the provider as a response
// It returns an error if the availability is not found

import { NextApiRequest, NextApiResponse } from 'next';
import { databases } from '../../../lib/appwrite.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  if (req.method === 'GET') {
    try {
      const response = await databases.listDocuments(
        process.env.DATABASE_ID!,
        process.env.AVAILABILITY_COLLECTION_ID!,
        [`userId=${userId}`]
      );
      res.status(200).json(response.documents);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch availability' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}