const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');

router.post('/:user_id', TransactionController.addTransaction);
router.get('/:user_id', TransactionController.viewTransactions);
router.put('/:transaction_id', TransactionController.updateTransaction);
router.delete('/:transaction_id', TransactionController.deleteTransaction);

module.exports = router;
