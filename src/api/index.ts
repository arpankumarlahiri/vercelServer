import express from 'express';

import rateLimit from 'express-rate-limit';
import MessageResponse from '../interfaces/MessageResponse';
import userRouter from './users';
import eventRouter from './events';

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

router.use(limiter);

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/users', userRouter);
router.use('/events', eventRouter);
export default router;
