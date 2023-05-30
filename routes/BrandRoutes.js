const express = require("express");

const router = express.Router();
const {
  getBrandValidate,
  deleteBrandValidate,
  updateBrandValidate,
  createBrandValidate,
} = require("../utils/validateors/brandValidator");
const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandServices");
const subCategoreyRoutes = require("./subCategoreyRoutes");
// route
router.use("/:BrandId/subBrand", subCategoreyRoutes);
router.route("/").get(getBrands).post(createBrandValidate, createBrand);
router
  .route("/:id")
  .get(getBrandValidate, getBrand)
  .put(updateBrandValidate, updateBrand)
  .delete(deleteBrandValidate, deleteBrand);
module.exports = router;
