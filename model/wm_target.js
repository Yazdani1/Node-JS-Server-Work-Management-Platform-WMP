const mongoose = require("mongoose");

const wmTargetSchema = new mongoose.Schema({
  target: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  wm_id: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WMTarget", wmTargetSchema);
