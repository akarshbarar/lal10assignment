import express, { Request, Response } from 'express';
import { registerSchema } from '../utils/validation';
import { registerUser } from '../controllers/authController';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
        await registerUser(req, res);
      } catch (err) {
        console.error('Error in /api/register:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
});

export default router;
