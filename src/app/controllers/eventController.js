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
  let params = req.query;

  try {
    if (req.query) {
      query = { name: new RegExp(params.name, "i"), active: true };
    }

    const events = await Event.find(query)
      .sort({ date_start: "asc" })
      .skip(pages > 0 ? (pages - 1) * size : 0)
      .limit(size);

    if (events.length !== 0) {
      return res.status(200).send({ events });
    } else {
      return res.status(404).send({ events, message: "Event not found" });
    }
  } catch (error) {
    return res.status(400).send({ error: "Error loading events" });
  }
});

router.get("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    return res.send({ event });
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
        latitude,
        longitude
      } = req.body;

      const event = await Event.create({
        name,
        image_url: url,
        description,
        date_start,
        date_end,
        organization: {
          name: organization_name,
          email,
          name_responsible
        },
        location: {
          latitude,
          longitude
        }
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

    return res.send({ event });
  } catch (error) {
    return res.status(400).send({ error: "Error updating Event" });
  }
});

router.delete("/:eventId", authMiddleware, async (req, res) => {
  try {
    await Event.findByIdAndRemove(req.params.eventId);

    return res.send();
  } catch (error) {
    return res.status(400).send({ error: "Error deleting event" });
  }
});

module.exports = app => app.use("/events", router);
