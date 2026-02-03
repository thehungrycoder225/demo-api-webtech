const express = require('express');
const router = express.Router();

// Import the Controller
const {
  getAllTransactions,
  createTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');

// Routes
router.get('/transactions', getAllTransactions);
router.post('/transactions', createTransaction);
router.get('/transactions/:id', getTransactionById);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);

module.exports = router;
