const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);
    
    db.run(`CREATE TABLE transactions (
        transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        amount REAL,
        date TEXT,
        category TEXT,
        description TEXT,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    )`);
    
    db.run(`CREATE TABLE categories (
        category_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    )`);
    
    db.run(`CREATE TABLE savings_goals (
        goal_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        target_amount REAL,
        current_date TEXT,
        track_date TEXT,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    )`);
});

module.exports = db;
