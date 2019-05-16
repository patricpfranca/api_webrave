const mongoose = require('../database');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  organization: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }],
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
}, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
