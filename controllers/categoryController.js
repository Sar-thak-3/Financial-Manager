const CategoryService = require('../services/categoryService');

class CategoryController {
    static addCategory(req, res) {
        const { user_id, name } = req.body;
        CategoryService.addCategory(user_id, name, (err, category) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json(category);
        });
    }

    static viewCategories(req, res) {
        const { user_id } = req.params;
        CategoryService.viewCategories(user_id, (err, categories) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json(categories);
        });
    }

    static updateCategory(req, res) {
        const { category_id } = req.params;
        const { name } = req.body;
        CategoryService.updateCategory(category_id, name, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Category updated' });
        });
    }

    static deleteCategory(req, res) {
        const { category_id } = req.params;
        CategoryService.deleteCategory(category_id, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(200).json({ message: 'Category deleted' });
        });
    }
}

module.exports = CategoryController;
