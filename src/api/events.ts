import express from 'express';
import passport from 'passport';
import event from '../Mongoose/Schema/event';
// import db from '../../models';

const eventRouter = express.Router();

eventRouter.use(passport.authenticate('jwt', { session: false }));

eventRouter.get('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const eventDetails = await event
      .find()
      .select('name description eventDate location organizer');
    res.json({ message: 'All Events', event: eventDetails });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

eventRouter.get('/:name', async (req, res) => {
  const eventDetails = await event.findOne({ name: req.params.name });
  res.json({ message: 'Event Details', event: eventDetails });
});

eventRouter.post('/', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (req?.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { name, description, eventDate, location } = req.body;
    const eventDetails = await event.create({
      name,
      description,
      eventDate,
      location,
    });
    res.json({ message: 'Events', user: req.user, event: eventDetails });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

eventRouter.delete('/:name', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (req?.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const eventDetails = await event.findOneAndDelete({
      name: req.params.name,
    });
    res.json({ message: 'Event Deleted', event: eventDetails });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

export default eventRouter;
