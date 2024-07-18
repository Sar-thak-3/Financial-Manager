const express = require('express');
const router = express.Router();
const SavingsGoalController = require('../controllers/savingsGoalController');

router.post('/:user_id', SavingsGoalController.addSavingsGoal);
router.get('/:user_id', SavingsGoalController.viewSavingsGoals);
router.put('/:goal_id', SavingsGoalController.updateSavingsGoal);
router.delete('/:goal_id', SavingsGoalController.deleteSavingsGoal);
router.get('/progress/:user_id/:goal_id', SavingsGoalController.checkSavingsProgress); // Updated route for progress check

module.exports = router;
