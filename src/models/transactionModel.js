const mongoose = require('mongoose');

// This is the "Rule Book" for Money
const transactionSchema = new mongoose.Schema({
  description: {
    type: String, // Text: "Starbucks"
    required: true,
  },
  amount: {
    type: Number, // Number: 5.50
    required: true,
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
