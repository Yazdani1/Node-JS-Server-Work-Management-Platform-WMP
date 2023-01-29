const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const favouriteSchema = new mongoose.Schema({
  tpi_id: {
    type: ObjectId,
    ref:"TPI"
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FavouriteTPI", favouriteSchema);
