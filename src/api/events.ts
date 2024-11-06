import express from 'express';
import passport from 'passport';
// import db from '../../models';

const eventRouter = express.Router();

eventRouter.use(passport.authenticate('jwt', { session: false }));

eventRouter.get('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json({ message: 'Events', user: req.user });
});

export default eventRouter;
