const mongoose = require("mongoose");

const subCategoryShema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "subcatogrey must be uinque"],
      minlength: [2, "too short"],
      maxnlength: [32, "too loong"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "stop and come back to put it in parent cateorey"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("subCategory", subCategoryShema);
