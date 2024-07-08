// app/pages/api/users.js
//Create API routes that handles HTTP requests
import { createUser } from '../../services/dbOperations';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password, isServiceProvider } = req.body;
    try {
      const newUser = await createUser(username, email, password, isServiceProvider);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
