const mongoose = require('mongoose');

// This is the "Rule Book" for Money
const transactionSchema = new mongoose.Schema({
  description: {
    type: String, // Text: "Starbucks"
    required: true,
    minLength: [3, 'Description must be at least 3 characters long'], // Custom error message if description is too short
  },
  amount: {
    type: Number, // Number: 5.50
    required: true,
    min: [0.01, 'Amount must be greater than zero'], // Custom error message if amount <= 0
  },
  type: {
    type: String,
    // Must be "income" (money in) or "expense" (money out)
    enum: ['income', 'expense'],
    required: true,
  },
  date: {
    type: Date, // A specific Calendar Date
    default: Date.now, // If empty, use Today's date
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
