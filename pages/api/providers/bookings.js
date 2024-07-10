import { getBookingsForProvider } from '@services/dbOperations';

export default async function handler(req, res) {
  const { providerId } = req.query;

  if (req.method === 'GET') {
    const bookings = await getBookingsForProvider(providerId);
    res.status(200).json(bookings);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
