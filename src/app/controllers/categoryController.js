const express = require("express");

const Event = require("../models/Event");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Event.aggregate([
      { $match: { active: true } },
      { $unwind: "$categories" },
      { $group: { _id: "$categories", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    return res.status(200).send(categories);
  } catch (error) {
    return res.status(404).send(categories);
  }
});

module.exports = app => app.use("/categories", router);
