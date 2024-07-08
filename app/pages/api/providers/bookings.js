// app/pages/api/providers/[providerId]/bookings.js
import { getBookingsForProvider } from '../../../../services/dbOperations';

export default async function handler(req, res) {
  const { providerId } = req.query;
  if (req.method === 'GET') {
    try {
      const bookings = await getBookingsForProvider(providerId);
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching bookings' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
