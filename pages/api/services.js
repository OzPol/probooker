// app/pages/api/services.js
import { createService } from '@services/dbOperations';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { providerId, serviceName, serviceDescription, price } = req.body;
    const service = await createService(providerId, serviceName, serviceDescription, price);
    res.status(201).json(service);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
