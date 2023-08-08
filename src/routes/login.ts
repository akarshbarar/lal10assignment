import express, { Request, Response } from 'express';
import { loginUser  } from '../controllers/authController';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        await loginUser(req, res);
      } catch (err) {
        console.error('Error in /api/register:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
});

export default router;
