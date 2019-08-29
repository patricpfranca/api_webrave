const express = require("express");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");

const multerConfig = require("../../config/multer");
const Event = require("../models/Event");

const router = express.Router();

router.get("/", async (req, res) => {
  let pages = parseInt(req.query.pages);
  let size = parseInt(req.query.per_page);
  let query = { active: true };

  if (req.query) {
    for (const key in req.query) {
      query = { [key]: new RegExp(req.query[key], "i"), active: true };
    }
  }

  await Event.find(query)
    .sort({ date_start: "asc" })
    .skip(size * (pages - 1))
    .limit(size)
    .exec(function(err, events) {
      if (events.length !== 0) {
        Event.countDocuments().exec(function(err, count) {
          res.status(200).send({
            events: events,
            current_page: pages,
            total_pages: Math.ceil(count / size)
          });
        });
      } else {
        return res.status(404).send({ events, message: "Event not found!" });
      }
    });
});

router.get("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    return res.send(event);
  } catch (error) {
    return res.status(400).send({ error: "Error loading event" });
  }
});

router.post(
  "/",
  authMiddleware,
  multer(multerConfig).single("file"),
  async (req, res) => {
    try {
      const { filename: key, location: url = "" } = req.file;
      const {
        name,
        description,
        date_start,
        date_end,
        organization_name,
        email,
        name_responsible,
        location,
        categories
      } = req.body;

      const event = await Event.create({
        name,
        image_url: url,
        categories,
        description,
        date_start,
        date_end,
        organization: {
          name: organization_name,
          email,
          name_responsible
        },
        location
      });

      return res.send(event);
    } catch (error) {
      return res.status(400).send({ error: "Error creating new Event" });
    }
  }
);

router.put("/:eventId", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.eventId, req.body, {
      new: true
    });

    return res.send(event);
  } catch (error) {
    return res.status(400).send({ error: "Error updating Event" });
  }
});

router.delete("/:eventId", authMiddleware, async (req, res) => {
  try {
    await Event.findByIdAndRemove(req.params.eventId);

    return res.status(204).send();
  } catch (error) {
    return res.status(400).send({ error: "Error deleting event" });
  }
});

module.exports = app => app.use("/events", router);
