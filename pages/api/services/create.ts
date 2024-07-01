import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Handler function to create a new service
const createServiceHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId, title, description, price } = req.body;

  try {
    // Check if the user exists and is a service provider
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // If user does not exist or is not a provider, return a 403 Forbidden response
    if (!user || user.userType !== 'provider') {
      return res.status(403).json({
        message: 'Forbidden: Only service providers can create services',
      });
    }

    // Create a new service
    const service = await prisma.service.create({
      data: {
        title,
        description,
        price,
        providerId: userId,
      },
    });

    // Return a 201 Created response with the new service
    res.status(201).json({ message: 'Service created successfully', service });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Export the handler function as default
export default createServiceHandler;
