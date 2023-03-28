const mongoose = require("mongoose");

const newsPortalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  des: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("NewsPortal", newsPortalSchema);
