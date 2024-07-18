const db = require('../utils/database');
const SavingsGoal = require('../models/savingsGoal');
const TransactionService = require('./transactionService');

class SavingsGoalService {
    static addSavingsGoal(user_id, target_amount, current_date, track_date, callback) {
        db.run('INSERT INTO savings_goals (user_id, target_amount, current_date, track_date) VALUES (?, ?, ?, ?)', [user_id, target_amount, current_date, track_date], function(err) {
            if (err) {
                console.log(err)
                return callback(err);
            }
            callback(null, new SavingsGoal(this.lastID, user_id, target_amount, current_date, track_date));
        });
    }

    static viewSavingsGoals(user_id, callback) {
        db.all('SELECT * FROM savings_goals WHERE user_id = ?', [user_id], async (err, rows) => {
            if (err) {
                return callback(err);
            }
            const goals = rows.map(row => new SavingsGoal(row.goal_id, row.user_id, row.target_amount, row.current_date, row.track_date));
            callback(null, goals);
        });
    }

    static updateSavingsGoal(goal_id, target_amount, current_date, track_date, callback) {
        db.run('UPDATE savings_goals SET target_amount = ?, current_date = ?, track_date = ? WHERE goal_id = ?', [target_amount, current_date, track_date, goal_id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }

    static deleteSavingsGoal(goal_id, callback) {
        db.run('DELETE FROM savings_goals WHERE goal_id = ?', [goal_id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }

    static async checkSavingsProgress(user_id, goal_id, callback) {
        db.get('SELECT * FROM savings_goals WHERE user_id = ? AND goal_id = ?', [user_id, goal_id], async (err, row) => {
            if (err) {
                return callback(err);
            }
            if (!row) {
                return callback(new Error('Savings goal not found'));
            }

            try {
                const transactions = await new Promise((resolve, reject) => {
                    TransactionService.getTransactionsByDateRange(user_id, row.current_date, row.track_date, (err, transactions) => {
                        if (err) return reject(err);
                        resolve(transactions);
                    });
                });

                const totalSavings = transactions.reduce((total, transaction) => {
                    return total + transaction.amount; // Adjust based on how savings are defined
                }, 0);

                const progress = row.target_amount - totalSavings;

                callback(null, {
                    goal_id: row.goal_id,
                    user_id: row.user_id,
                    target_amount: row.target_amount,
                    current_date: row.current_date,
                    track_date: row.track_date,
                    total_savings: totalSavings,
                    progress
                });
            } catch (err) {
                callback(err);
            }
        });
    }
}

module.exports = SavingsGoalService;
