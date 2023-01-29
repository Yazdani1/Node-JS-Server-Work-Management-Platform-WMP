const mongoose = require("mongoose");

const eCategorySchema = new mongoose.Schema({
  ecategoryname: {
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

module.exports = mongoose.model("ECategory", eCategorySchema);
