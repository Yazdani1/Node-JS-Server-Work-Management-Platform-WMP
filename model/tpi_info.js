const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const tpiInfoSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  issues: {
    type: String,
    required: true,
  },

  responsible: {
    type: [String],
    required: true,
  },


  tpi_id: {
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
  updatedAt: {
    type: String,
    // default: Date.now,
  }
});

module.exports = mongoose.model("TPI_Info", tpiInfoSchema);
