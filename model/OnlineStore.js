const mongoose = require("mongoose");

const onlineStoreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  photo: {
    type: [String],
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("OnlineStore", onlineStoreSchema);
