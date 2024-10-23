const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

let newCategory = asyncHandler(async (req, res) => {
  const { name} = req.body;
  const userId = req.user._id;
  try {
    const category = await Category.create({ name, user: userId });
    await category.save();
    res
      .status(200)
      .json({ success: true, message: "new category created", category });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "new category creation error", error });
  }
});

let fetchCategories = asyncHandler(async (req, res) => {
    const userId = req.user._id
  try {
    const getall = await Category.find({user:userId});
    res
      .status(200)
      .json({ success: true, message: "fetched all categories", getall });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "failed to get all categories", error });
  }
});




let deleteCategories = asyncHandler(async (req, res) => {
   
  try {
    const delCategory = await Category.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "deleted successfull", delCategory });
  } catch (error) {
    res
      .status(401)
      .json({
        success: false,
        message: "failed to delete the category",
        error,
      });
  }
});
module.exports = { newCategory, fetchCategories, deleteCategories };
