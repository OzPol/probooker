// app/pages/api/services.js
import { createService } from '../../services/dbOperations';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { providerId, serviceName, serviceDescription, price } = req.body;
    try {
      const newService = await createService(providerId, serviceName, serviceDescription, price);
      res.status(201).json(newService);
    } catch (error) {
      res.status(500).json({ error: 'Error creating service' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
