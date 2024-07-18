const TransactionService = require('../services/transactionService');
const CategoryService = require('../services/categoryService');

class TransactionController {
    static async addTransaction(req, res) {
        try {
            const { user_id, amount, date, category, description } = req.body;
    
            // Fetch the list of categories for the user
            CategoryService.viewCategories(user_id, async (err, categories) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
    
                // Check if the provided category exists in the fetched list
                let categoryExists = false;
                for (let i = 0; i < categories.length; i++) {
                    if (categories[i].name === category) {
                        categoryExists = true;
                        break;
                    }
                }
    
                if (!categoryExists) {
                    return res.status(400).json({ error: 'Category not in list, add it first' });
                }
    
                // Proceed with adding the transaction if category exists
                try {
                    TransactionService.addTransaction(user_id, amount, date, category, description, async (err, transaction) => {
                        if (err) {
                            return res.status(400).json({ error: err.message });
                        }
                        return res.status(201).json(transaction);
                    });
                } catch (err) {
                    res.status(400).json({ error: err.message });
                }
            });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    

    static viewTransactions(req, res) {
        const { user_id } = req.params;
        TransactionService.viewTransactions(user_id, (err, transactions) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json(transactions);
        });
    }

    static updateTransaction(req, res) {
        const { transaction_id } = req.params;
        const { amount, date, category, description } = req.body;
        TransactionService.updateTransaction(transaction_id, amount, date, category, description, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Transaction updated' });
        });
    }

    static deleteTransaction(req, res) {
        const { transaction_id } = req.params;
        TransactionService.deleteTransaction(transaction_id, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Transaction deleted' });
        });
    }
}

module.exports = TransactionController;
