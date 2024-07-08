// app/pages/api/users.js
import { createUser } from '@services/dbOperations';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password, isServiceProvider } = req.body;
    const user = await createUser(username, email, password, isServiceProvider);
    res.status(201).json(user);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
