import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  eventDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    validate: {
      validator: (v: string) => v === 'Bangalore' || v === 'Hyderabad',
      message: 'Location must be Bangalore or Hyderabad',
    },
  },
  organizer: {
    type: String,
    required: true,
    default: 'John Doe',
  },
});

export default mongoose.model('Event', eventSchema);
