const mongoose = require("mongoose");

const tpiItemSchema = new mongoose.Schema({
  tpi_item_info: [
    {
      title: String,
      value: Number,
      details: String,
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TPI_Item", tpiItemSchema);
