const db = require('../utils/database');
const User = require('../models/user');

class UserService {
    static registerUser(name, email, password, callback) {
        db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, new User(this.lastID, name, email, password));
        });
    }

    static loginUser(email, password, callback) {
        db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
            if (err) {
                return callback(err);
            }
            if (!row) {
                return callback(null, null);
            }
            callback(null, new User(row.user_id, row.name, row.email, row.password));
        });
    }
}

module.exports = UserService;
