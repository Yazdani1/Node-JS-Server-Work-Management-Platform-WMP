const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  doors: {
    type: Number,
    required: true,
  },

  brands: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },

  deliverytype: {
    type: String,
    required: true,
  },

  featured: {
    type: Boolean,
    default: false
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

module.exports = mongoose.model("Product", productSchema);
