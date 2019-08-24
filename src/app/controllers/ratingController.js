const express = require("express");

const Rating = require("../models/Rating");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      pub,
      local,
      food,
      lineup,
      stall,
      bathroom,
      lighting,
      security,
      cleaning,
      comment,
      media,
      _eventId
    } = req.body;

    const ratings = await Rating.create({
      ratings: {
        pub,
        local,
        food,
        lineup,
        stall,
        bathroom,
        lighting,
        security,
        cleaning
      },
      comment,
      media,
      _eventId
    });

    return res.send(ratings);
  } catch (error) {
    console.log("error", error);
  }
});

router.get("/:ratingId", async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.ratingId);

    return res.send(rating);
  } catch (error) {
    return res.status(400).send({ error: "Rating not found" });
  }
});

router.get("/events/:_eventId", async (req, res) => {
  try {
    const ratings = await Rating.find({ _eventId: req.params.eventId });

    return res.send(ratings);
  } catch (error) {
    return res.status(400).send({ error: "Comments for event, not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const rating = await Rating.find({});

    return res.send(rating);
  } catch (error) {
    return res.status(400).send({ error: "Ratings not found" });
  }
});

router.delete("/:ratingId", async (req, res) => {
  try {
    await Rating.findByIdAndRemove(req.params.ratingId);

    return res.status(204).send();
  } catch (error) {
    return res.status(400).send({ error: "Error deleting rating" });
  }
});

module.exports = app => app.use("/ratings", router);
