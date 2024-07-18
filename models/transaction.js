class Transaction {
    constructor(transaction_id, user_id, amount, date, category, description) {
        this.transaction_id = transaction_id;
        this.user_id = user_id;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.description = description;
    }
}

module.exports = Transaction;
