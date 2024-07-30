// pages/api/availability/[userId].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { databases } from '../../../lib/appwrite.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  if (req.method === 'GET') {
    try {
      const response = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_AVAILABILITY_COLLECTION_ID!,
        userId as string
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch availability' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
