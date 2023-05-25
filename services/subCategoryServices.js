const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const SubCategory = require("../models/subCategoryModuel");

//  @desc   create SubCategory
//  @route  GET /api/v1/categories
//  @access Privte

exports.SetcategoryId = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subcategory = await SubCategory.create({
    name: name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subcategory });
});

exports.filterObjectFun = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};
//  @desc   get all SubCategory
//  @route  GET /api/v1/subcategories
//  @access Puplic
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const subCategoreies = await SubCategory.find(req.filterObj)
    .limit(limit)
    .skip(skip);
  // .populate({ path: "category", select: "name -_id" });
  res
    .status(200)
    .json({ result: subCategoreies.length, page, data: subCategoreies });
});

//  @desc   get spasifc SubCategory By ID
//  @route  GET /api/v1/subcategories/:id
//  @access Puplic

exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategorey = await SubCategory.findById(id);
  // .populate({
  //   path: "category",
  //   select: "name -_id",
  // });
  if (!subCategorey) {
    // res.status(404).json({ msg: `no category with id: ${id}` });
    return next(new ApiError(`no category with id: ${id}`, 404));
  }
  res.status(200).json({ data: subCategorey });
});

//  @desc   Update spasifc subcategorey
//  @route  PUT /api/v1/subcategories
//  @access Privte

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subcategorey = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name), category: category },
    { new: true }
  );
  if (!subcategorey) {
    // res.status(404).json({ msg: `no category with id: ${id}` });
    return next(new ApiError(`no subcategory with id: ${id}`, 404));
  }
  res.status(200).json({ data: subcategorey });
});

//  @desc   Delete spasifc subcategorey
//  @route  DELETE /api/v1/subcategories
//  @access Privte

exports.deleteSubCatogry = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategorey = await SubCategory.findByIdAndDelete(id);
  if (!subcategorey) {
    // res.status(404).json({ msg: `no category with id: ${id}` });
    return next(new ApiError(`no subcategory with id: ${id}`, 404));
  }
  res.status(204).send();
});
