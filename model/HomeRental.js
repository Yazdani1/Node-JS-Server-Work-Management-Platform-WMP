const mongoose = require("mongoose");

const homeRentalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  room: {
    type: Number,
    required: true,
  },

  latitude: {
    type: Number,
    required: true,
  },
  
  longitude: {
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

module.exports = mongoose.model("HomeRental", homeRentalSchema);
