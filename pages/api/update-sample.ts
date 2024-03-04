import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, year, month, date, amount, position } = req.body;

  try {
    if (!req.body) {
      res.status(400).json({ message: 'Missing required fields' });
    }
    const updatedSample = await prisma.sample.update({
      where: {
        id: id,
      },
      data: {
        createdAt: new Date(year, month - 1, date),
        amount: amount,
        position: position,
      },
    });

    res
      .status(200)
      .json({ updatedSample: updatedSample, message: 'Sample updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
