import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.body) {
      res.status(400).json({ message: 'Missing required fields' });
    }
    await prisma.fertilization.delete({
      where: {
        id: req.body,
      },
    });

    res.status(200).json({ message: 'Fertilization deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
