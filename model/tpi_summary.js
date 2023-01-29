const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const tpiSummarySchema = new mongoose.Schema({
  tpi_summary: {
    type: String,
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
});

module.exports = mongoose.model("TPI_Summary", tpiSummarySchema);
