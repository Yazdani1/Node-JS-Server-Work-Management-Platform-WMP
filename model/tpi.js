const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const tpiSchema = new mongoose.Schema({
  tpi_name: {
    type: String,
    required: true,
  },
//   wm_id: {
//     type: ObjectId,
//     ref: "WorkManagement",
//   },
  wm_id: {
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

module.exports = mongoose.model("TPI", tpiSchema);
