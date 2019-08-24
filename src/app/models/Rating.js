const mongoose = require("../../database");

const RatingSchema = new mongoose.Schema(
  {
    ratings: {
      _id: false,
      pub: {
        type: Number
      },
      local: {
        type: Number
      },
      food: {
        type: Number
      },
      lineup: {
        type: Number
      },
      stall: {
        type: Number
      },
      bathroom: {
        type: Number
      },
      lighting: {
        type: Number
      },
      security: {
        type: Number
      },
      cleaning: {
        type: Number
      }
    },
    comment: {
      type: String,
      maxlength: 250
    },
    media: {
      type: Number
    },
    _eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;
