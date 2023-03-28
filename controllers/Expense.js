const Expense = require("../model/Expense");

exports.createExpense = async (req, res) => {
  try {
    const { name, expenseType, amount } = req.body;

    if (!name) {
      return res.status(422).json({ error: "Please add name" });
    }
    if (!expenseType) {
      return res.status(422).json({ error: "Please add expenseType" });
    }

    if (!amount) {
      return res.status(422).json({ error: "Please add amount" });
    }

    const expenseDetails = Expense({ name, expenseType, amount });
    const expense = await Expense.create(expenseDetails);
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
// to get all the expense
/**
 * Get all the expense list
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllExpense = async (req, res) => {
  try {
    const allExpense = await Expense.find().sort({ date: -1 });
    res.status(200).json(allExpense);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const singleExpenseID = { _id: req.params.id };
    const loadSingleExpense = await Expense.findOne(singleExpenseID);
    if (!loadSingleExpense) {
      return res.status(404).json({ error: "Expense id could not found" });
    }
    const deleteSingleExpense = await Expense.findByIdAndDelete(
      singleExpenseID
    );
    res
      .status(200)
      .json({ deleteSingleExpense, message: "Expense Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
// to count expense with aggregation of mongodb
exports.countAllExpenses = async (req, res) => {
  try {
    const allExpense = await Expense.aggregate([
      { $group: { _id: "$expenseType", total: { $sum: "$amount" } } },
    ]);
    res.status(200).json(allExpense);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
