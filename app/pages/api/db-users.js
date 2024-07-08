// app/pages/api/db-users.js
import db from '../../../utils/db';

export default async function handler(req, res) {
  try {
    const result = await db.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
