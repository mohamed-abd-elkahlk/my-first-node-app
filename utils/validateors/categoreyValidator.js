const { check } = require("express-validator");
const validateMiddlewere = require("../../Middleware/vailedaitMiddlewere");

exports.getCategoryValidate = [
  check("id").isMongoId().withMessage("invalid categorey ID"),
  validateMiddlewere,
];

exports.createCategoryValidate = [
  check("name")
    .notEmpty()
    .withMessage("catogry reqire")
    .isLength({ min: 3 })
    .withMessage(
      "the category name length is unvalid you should type with 3 word at least"
    )
    .isLength({ max: 32 })
    .withMessage(
      "the category name length is unvalid you should type with 32 word at least"
    ),
  validateMiddlewere,
];

exports.updateCategoryValidate = [
  check("id").isMongoId().withMessage("invalid categorey ID"),
  validateMiddlewere,
];
exports.deleteCategoryValidate = [
  check("id").isMongoId().withMessage("invalid categorey ID"),
  validateMiddlewere,
];
