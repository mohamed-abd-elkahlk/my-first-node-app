const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const Brand = require("../models/brandyModel");

//  @desc   get all Brands
//  @route  GET /api/v1/Brands
//  @access Puplic
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const brand = await Brand.find({}).limit(limit).skip(skip);

  res.status(200).json({ result: brand.length, page, data: brand });
});

//  @desc   get spasifc Brand By ID
//  @route  GET /api/v1/Brand/:id
//  @access Puplic

exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    // res.status(404).json({ msg: `no category with id: ${id}` });
    return next(new ApiError(`no Brand with id: ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

//  @desc   create Brand
//  @route  GET /api/v1/Brand
//  @access Privte

exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await Brand.create({
    name: name,
    slug: slugify(name),
  });
  res.status(201).json({ data: brand });
});
//  @desc   Update spasifc Brand
//  @route  PUT /api/v1/Brand
//  @access Privte

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    // res.status(404).json({ msg: `no category with id: ${id}` });
    return next(new ApiError(`no Brand with id: ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

//  @desc   Delete spasifc Brand
//  @route  DELETE /api/v1/Brand
//  @access Privte

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    // res.status(404).json({ msg: `no category with id: ${id}` });
    return next(new ApiError(`no Brand with id: ${id}`, 404));
  }
  res.status(204).send();
});
