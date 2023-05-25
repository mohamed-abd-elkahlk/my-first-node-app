const express = require("express");
const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateCategory,
  deleteSubCatogry,
  SetcategoryId,
  filterObjectFun,
} = require("../services/subCategoryServices");
const {
  createSubCategoryValidate,
  getSubCategoryValidate,
  updateSubCategoryValidate,
  deleteSubCategoryValidate,
} = require("../utils/validateors/subCategoreyValidator");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(SetcategoryId, createSubCategoryValidate, createSubCategory)
  .get(filterObjectFun, getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidate, getSubCategory)
  .put(updateSubCategoryValidate, updateCategory)
  .delete(deleteSubCategoryValidate, deleteSubCatogry);
module.exports = router;
