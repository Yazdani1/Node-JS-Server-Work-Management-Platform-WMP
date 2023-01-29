const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  expenseType: {
    type: String,
    enum : ['Shopping','Grocery','Food','Trip'],
    default: 'Shopping'
  },


  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
