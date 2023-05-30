const mongoose = require("mongoose");
// schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Brand name reqire"],
      unique: [true, "Brand must be unique"],
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
module.exports = mongoose.model("Brand", brandSchema);
