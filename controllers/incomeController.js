const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Income = require('../models/incomeModels');

// Add Incomes
exports.addIncome = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const { title, amount, type, date, category, description } = req.body;

    const income = new Income({
      title,
      amount,
      type: type || "income",
      date,
      category,
      description,
      user: req.user._id,
    });
    await income.save();

    res.status(201).send(income);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id }); // Get incomes for the logged in user only
    res.json(incomes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({ _id: req.params.id, user: req.user._id }); // Only delete the income if it belongs to the authenticated user
    if (!income) {
      res.status(404).send();
    }
    res.send(income);
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
}
