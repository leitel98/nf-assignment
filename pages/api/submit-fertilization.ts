import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { date, amount, position } = req.body;

  try {
    if (!req.body) {
      res.status(400).json({ message: 'Missing required fields' });
    }
    const newFertilization = await prisma.fertilization.create({
      data: {
        createdAt: new Date(date),
        amount: parseInt(amount),
        position,
      },
    });

    res.status(200).json({
      newFertilization: newFertilization,
      message: 'Fertilization created',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
