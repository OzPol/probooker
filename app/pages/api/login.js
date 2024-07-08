// app/pages/api/login.js
import { account } from '../../../utils/appwrite';

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    const session = await account.createSession(email, password);
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
