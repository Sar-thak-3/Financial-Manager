const db = require('../utils/database');
const Category = require('../models/category');

class CategoryService {
    static addCategory(user_id, name, callback) {
        db.run('INSERT INTO categories (user_id, name) VALUES (?, ?)', [user_id, name], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, new Category(this.lastID, user_id, name));
        });
    }

    static viewCategories(user_id, callback) {
        db.all('SELECT * FROM categories WHERE user_id = ?', [user_id], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows.map(row => new Category(row.category_id, row.user_id, row.name)));
        });
    }

    static updateCategory(category_id, name, callback) {
        db.run('UPDATE categories SET name = ? WHERE category_id = ?', [name, category_id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }

    static deleteCategory(category_id, callback) {
        db.run('DELETE FROM categories WHERE category_id = ?', [category_id], function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }
}

module.exports = CategoryService;
