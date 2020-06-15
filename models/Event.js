const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});
module.exports = User = mongoose.model("events", EventSchema);