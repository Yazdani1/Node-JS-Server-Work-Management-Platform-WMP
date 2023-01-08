const router = require("express").Router();
const {createExpense,getAllExpense,deleteExpense,countAllExpenses} = require("../controllers/Expense");

// to create expense

router.post("/create-expense",createExpense);


// to get all the expense

router.get("/get-Allexpense",getAllExpense);


// to coun expense

router.get("/count-expenses",countAllExpenses);


// to delete expense

router.delete("/delete-expense/:id",deleteExpense);


module.exports = router;
