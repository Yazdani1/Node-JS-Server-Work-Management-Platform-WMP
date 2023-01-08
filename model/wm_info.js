const mongoose = require("mongoose");

const wmInfoSchema = new mongoose.Schema({
  wminfo: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum : ['RED','GREEN','YELLOW'],
    default: 'RED'
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

module.exports = mongoose.model("WMInfo", wmInfoSchema);
