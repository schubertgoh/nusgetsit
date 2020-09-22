const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// Load input validation
const validateCommunityInput = require("../../validation/community");
// Load Community model
const Communities = require("../../models/Community");


router.post("/new-community", (req, res) => {
    // Form validation
  const { errors, isValid } = validateCommunityInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  Communities.findOne({ community_title: req.body.community_title }).then(user => {
      if (user) {
        return res.status(400).json({ community_title: "Community with same title exists" });
      } else {
        const newCommunity = new Communities({
          community_title: req.body.community_title,
          community_info: req.body.community_info,
          
        });
        newCommunity
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
      }
    });
  });

module.exports = router;