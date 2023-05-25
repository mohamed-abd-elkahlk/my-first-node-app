const express = require("express");

const router = express.Router();
const {
  getCategoryValidate,
  deleteCategoryValidate,
  updateCategoryValidate,
  createCategoryValidate,
} = require("../utils/validateors/categoreyValidator");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCatogry,
} = require("../services/caetogreyServices");
const subCategoreyRoutes = require("./subCategoreyRoutes");
// route
router.use("/:categoryId/subcategory", subCategoreyRoutes);
router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidate, createCategory);
router
  .route("/:id")
  .get(getCategoryValidate, getCategory)
  .put(updateCategoryValidate, updateCategory)
  .delete(deleteCategoryValidate, deleteCatogry);
module.exports = router;
