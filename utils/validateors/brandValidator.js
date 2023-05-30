const { check } = require("express-validator");
const validateMiddlewere = require("../../Middleware/vailedaitMiddlewere");

exports.getBrandValidate = [
  check("id").isMongoId().withMessage("invalid Brand ID"),
  validateMiddlewere,
];

exports.createBrandValidate = [
  check("name")
    .notEmpty()
    .withMessage("catogry reqire")
    .isLength({ min: 3 })
    .withMessage(
      "the Brand name length is unvalid you should type with 3 word at least"
    )
    .isLength({ max: 32 })
    .withMessage(
      "the Brand name length is unvalid you should type with 32 word at least"
    ),
  validateMiddlewere,
];

exports.updateBrandValidate = [
  check("id").isMongoId().withMessage("invalid Brand ID"),
  validateMiddlewere,
];
exports.deleteBrandValidate = [
  check("id").isMongoId().withMessage("invalid Brand ID"),
  validateMiddlewere,
];
