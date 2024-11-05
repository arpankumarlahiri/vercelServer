import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';

import db from '../../models';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.post('/users', async (req, res) => {
  const user = await db.User.create(req.body);
  res.json({ message: 'User created', user });
});

router.use('/emojis', emojis);

export default router;
