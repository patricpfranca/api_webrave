const express = require('express');
const authMiddleware = require('../middleware/auth');

const Event = require('../models/Event');

const router = express.Router();

// router.use(authMiddleware);

router.get('/', (req, res) => {
  event = Event.find();
  res.status(200).send({ event });
});

router.post('/', (req, res) => {
  console.log(req.body);
});

module.exports = app => app.use('/events', router);
