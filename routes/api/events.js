const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// Load input validation
const validateEventInput = require("../../validation/event");
// Load Events model
const Events = require("../../models/Event");

router.post("/new-event", (req, res) => {
    // Form validation
  const { errors, isValid } = validateEventInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  Events.findOne({ event_title: req.body.event_title }).then(user => {
      if (user) {
        return res.status(400).json({ event_title: "Event with same title exists" });
      } else {
        const newEvent = new Events({
          event_title: req.body.event_title,
          event_description: req.body.event_description,
          event_location: req.body.event_location,
          event_time: req.body.event_time
        });
        newEvent
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
      }
    });
  });

module.exports = router;