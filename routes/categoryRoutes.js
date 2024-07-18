const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.post('/', CategoryController.addCategory);
router.get('/:user_id', CategoryController.viewCategories);
router.put('/:category_id', CategoryController.updateCategory);
router.delete('/:category_id', CategoryController.deleteCategory);

module.exports = router;
