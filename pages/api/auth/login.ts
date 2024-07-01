import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'my-secret-key'; // Ideally, this should be in an environment variable

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  // Mock user data
  const user = {
    id: 1,
    username: 'test',
    password: await bcrypt.hash('password', 10),
  };

  // Verify user
  if (
    username === user.username &&
    (await bcrypt.compare(password, user.password))
  ) {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

export default loginHandler;
