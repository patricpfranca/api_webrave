const mongoose = require("../../database");

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    image_url: {
      type: String
    },
    categories: [String],
    organization: {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      name_responsible: {
        type: String,
        required: true
      }
    },
    description: {
      type: String
    },
    active: {
      type: Boolean,
      default: true
    },
    date_start: {
      type: Date,
      required: true
    },
    date_end: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

EventSchema.pre("save", function() {
  if (!this.image_url) {
    this.image_url = `${process.env.APP_URL}/files/${req.file.filename}`;
  }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
