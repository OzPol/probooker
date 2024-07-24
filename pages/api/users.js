// app/pages/api/users.js
import { createUser } from '@services/dbOperations';
import { account } from   "../../lib/appwrite"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password, isServiceProvider } = req.body;
    const user = await createUser(username, email, password, isServiceProvider);
    res.status(201).json(user);
  } else if (req.method === 'GET') {
    try {
      const user = await account.get();
      res.status(200).json(user);
    } catch (error) {
      res.status(401).json({ error: 'User not logged in' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
