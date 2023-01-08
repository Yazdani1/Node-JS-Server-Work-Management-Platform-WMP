const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const ecommerceItemSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },


  price: {
    type: Number,
    required: true,
  },


  ecategoryid: {
    type: ObjectId,
    ref:"ECategory"
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

module.exports = mongoose.model("ECommerceItem", ecommerceItemSchema);
