// pages/api/auth/register.ts
// Handles both service providers and customers.
// The userType field distinguishes them.

import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password, userType } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        userType, // 'provider' or 'customer'
      },
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export default registerHandler;
