// pages/api/services/create.ts
// only service providers can create services

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, title, description, price } = req.body;

    try {
    // Check if user is a service provider
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user || user.userType !== 'provider') {
        return res.status(403).json({ message: 'Forbidden: Only service providers can create services' });
    }

    const service = await prisma.service.create({
        data: {
        title,
        description,
        price,
        providerId: userId,
        },
    });

    res.status(201).json({ message: 'Service created successfully', service });
    } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
    }
};
