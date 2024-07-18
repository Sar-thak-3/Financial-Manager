class SavingsGoal {
    constructor(goal_id, user_id, target_amount, current_date, track_date) {
        this.goal_id = goal_id;
        this.user_id = user_id;
        this.target_amount = target_amount;
        this.current_date = current_date;
        this.track_date = track_date;
    }
}

module.exports = SavingsGoal;