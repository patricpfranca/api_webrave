const mongoose = require('../../database');

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    organization: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      name_responsible: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    date_start: {
      type: Date,
      required: true,
    },
    date_end: {
      type: Date,
      required: true,
    },
    location: {
      latitude: Number,
      longitude: Number,
    },
  },
  { timestamps: true },
);

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
