

const Expense = require("../models/expenseModel")
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Add Expense
exports.addExpense = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
          return res.status(404).send("User not found");
        }
    
        const { title, amount, type, date, category, description } = req.body;
    
        const expense = new Expense({
          title,
          amount,
          type: type || "expenses",
          date,
          category,
          description,
          user: req.user._id,
        });
    
        await expense.save();
    
        res.status(201).send(expense);
      } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal server error' });
      }
    };

    
exports.getExpense = async (req, res) => {
  try {
    const Expenses = await Expense.find({ user: req.user._id }); // Get expenses for the logged in user only
    res.json(Expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id }) // Only delete the expense if it belongs to the authenticated user
    if (!expense) {
      res.status(404).send()
    }
    res.send(expense)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
}
