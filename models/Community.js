const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CommunitySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  },
  memberCount: {
    type: Number,
    default: 0
  }
});
module.exports = Community = mongoose.model("communities", CommunitySchema);