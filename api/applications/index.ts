import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/db';
import Application from '../../models/Application';
import { authMiddleware } from '../../middleware/auth';

interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    userId: string;
  };
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        const { page = 1, size = 10 } = req.query;
        const applications = await Application.find({ userId: req.user?.userId })
          .skip((Number(page) - 1) * Number(size))
          .limit(Number(size));
        const total = await Application.countDocuments({ userId: req.user?.userId });
        res.status(200).json({ applications, total });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching applications' });
      }
      break;

    case 'POST':
      try {
        const application = await Application.create({
          ...req.body,
          userId: req.user?.userId,
        });
        res.status(201).json(application);
      } catch (error) {
        res.status(500).json({ message: 'Error creating application' });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}

export default authMiddleware(handler);
