const SavingsGoalService = require('../services/savingsGoalService');

class SavingsGoalController {
    static addSavingsGoal(req, res) {
        const { target_amount, current_date, track_date } = req.body;
        const { user_id } = req.params;
        console.log(user_id);
        SavingsGoalService.addSavingsGoal(user_id, target_amount, current_date, track_date, (err, goal) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json(goal);
        });
    }

    static viewSavingsGoals(req, res) {
        const { user_id } = req.params;
        SavingsGoalService.viewSavingsGoals(user_id, (err, goals) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json(goals);
        });
    }

    static updateSavingsGoal(req, res) {
        const { goal_id } = req.params;
        const { target_amount, current_date, track_date } = req.body;
        SavingsGoalService.updateSavingsGoal(goal_id, target_amount, current_date, track_date, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Savings goal updated' });
        });
    }

    static deleteSavingsGoal(req, res) {
        const { goal_id } = req.params;
        SavingsGoalService.deleteSavingsGoal(goal_id, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Savings goal deleted' });
        });
    }

    static checkSavingsProgress(req, res) {
        const { user_id, goal_id } = req.params;
        SavingsGoalService.checkSavingsProgress(user_id, goal_id, (err, progress) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json(progress);
        });
    }
}

module.exports = SavingsGoalController;
