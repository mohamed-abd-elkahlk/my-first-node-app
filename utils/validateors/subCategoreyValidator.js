const { check } = require("express-validator");
const validateMiddlewere = require("../../Middleware/vailedaitMiddlewere");

exports.getSubCategoryValidate = [
  check("id").isMongoId().withMessage("invalid subCategorey ID"),
  validateMiddlewere,
];

exports.createSubCategoryValidate = [
  check("name")
    .notEmpty()
    .withMessage("subCatogry reqire")
    .isLength({ min: 2, max: 32 })
    .withMessage(
      "the Subcategory name length is unvalid you should type with 2:32 word at least"
    ),
  check("category")
    .notEmpty()
    .withMessage("subCatogry reqire must be belong to Categorey")
    .isMongoId()
    .withMessage("invalid catogrey id format"),
  validateMiddlewere,
];

exports.updateSubCategoryValidate = [
  check("id").isMongoId().withMessage("invalid categorey ID"),
  validateMiddlewere,
];
exports.deleteSubCategoryValidate = [
  check("id").isMongoId().withMessage("invalid categorey ID"),
  validateMiddlewere,
];
