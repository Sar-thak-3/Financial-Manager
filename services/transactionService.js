const db = require('../utils/database');
const Transaction = require('../models/transaction');

class TransactionService {
    static addTransaction(user_id, amount, date, category, description, callback) {
        db.run('INSERT INTO transactions (user_id, amount, date, category, description) VALUES (?, ?, ?, ?, ?)', [user_id, amount, date, category, description], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, new Transaction(this.lastID, user_id, amount, date, category, description));
        });
    }

    static viewTransactions(user_id, callback) {
        db.all('SELECT * FROM transactions WHERE user_id = ?', [user_id], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows.map(row => new Transaction(row.transaction_id, row.user_id, row.amount, row.date, row.category, row.description)));
        });
    }

    static updateTransaction(transaction_id, amount, date, category, description, callback) {
        db.run('UPDATE transactions SET amount = ?, date = ?, category = ?, description = ? WHERE transaction_id = ?', [amount, date, category, description, transaction_id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }

    static deleteTransaction(transaction_id, callback) {
        db.run('DELETE FROM transactions WHERE transaction_id = ?', [transaction_id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }

    static getTransactionsByDateRange(user_id, start_date, end_date, callback) {
        db.all('SELECT * FROM transactions WHERE user_id = ? AND date BETWEEN ? AND ?', [user_id, start_date, end_date], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    }
}

module.exports = TransactionService;
