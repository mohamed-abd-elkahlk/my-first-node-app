const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Category = require("../models/categoryModel");

//  @desc   get all categorey
//  @route  GET /api/v1/categories
//  @access Puplic
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categorey = await Category.find({}).limit(limit).skip(skip);
  res.status(200).json({ result: categorey.length, page, data: categorey });
});

//  @desc   get spasifc categorey By ID
//  @route  GET /api/v1/categories/:id
//  @access Puplic

exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const categorey = await Category.findById(id);
  if (!categorey) {
    // res.status(404).json({ msg: `no category with id: ${id}` });
    return next(new ApiError(`no category with id: ${id}`, 404));
  }
  res.status(200).json({ data: categorey });
});

//  @desc   create categorey
//  @route  GET /api/v1/categories
//  @access Privte

exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({
    name: name,
    slug: slugify(name),
  });
  res.status(201).json({ data: category });
});
//  @desc   Update spasifc categorey
//  @route  PUT /api/v1/categories
//  @access Privte

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const categorey = await Category.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!categorey) {
    // res.status(404).json({ msg: `no category with id: ${id}` });
    return next(new ApiError(`no category with id: ${id}`, 404));
  }
  res.status(200).json({ data: categorey });
});

//  @desc   Delete spasifc categorey
//  @route  DELETE /api/v1/categories
//  @access Privte

exports.deleteCatogry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const categorey = await Category.findByIdAndDelete(id);
  if (!categorey) {
    // res.status(404).json({ msg: `no category with id: ${id}` });
    return next(new ApiError(`no category with id: ${id}`, 404));
  }
  res.status(204).send();
});
