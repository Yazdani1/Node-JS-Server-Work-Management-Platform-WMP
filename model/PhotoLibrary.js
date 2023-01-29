const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const photoLibrarySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },


  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PhotoLibrary", photoLibrarySchema);
