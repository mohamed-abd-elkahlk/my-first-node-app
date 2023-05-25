const mongoose = require("mongoose");
// schema
const catogreySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "categorey reqire"],
      unique: [true, "categorey must be unique"],
      minlength: [3, "too short name"],
      maxlength: [30, "too long name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    images: String,
  },
  { timestamps: true }
);
// model
const categoryModel = mongoose.model("Category", catogreySchema);

module.exports = categoryModel;
