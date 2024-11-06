import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import userRouter from './users';
import eventRouter from './events';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/users', userRouter);
router.use('/events', eventRouter);
export default router;
