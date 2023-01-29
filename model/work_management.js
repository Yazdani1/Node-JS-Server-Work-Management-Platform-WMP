const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const workManagementSchema = new mongoose.Schema({
  wm_name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    index: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WorkManagement", workManagementSchema);
