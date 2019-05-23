const express = require("express");
const authMiddleware = require("../middleware/auth");

const Event = require("../models/Event");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();

    return res.send({ events });
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

router.post("/", authMiddleware, async (req, res) => {
  try {
    const event = await Event.create(req.body);

    return res.send({ event });
  } catch (error) {
    return res.status(400).send({ error: "Error creating new Event" });
  }
});

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
