const Task = require("../models/taskModel");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

let createTask = asyncHandler(async (req, res) => {
  const { title, status, category, description, duedate } = req.body;
  const userId = req.user._id;
  try {
    const tasks = await Task.create({
      title,
      status,
      category,
      description,
      duedate,
      user: userId,
    });
    await tasks.save();
    await tasks.populate("category");
    res
      .status(200)
      .json({ success: true, message: "new task created successfully", tasks });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ success: false, message: "new task not created", error });
  }
});

let fetchTask = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const getall = await Task.find({ user: userId }).populate("category");
  res
    .status(200)
    .json({ success: true, message: "all tasks are fetched", getall });
});

let fetchsingle = asyncHandler(async (req, res) => {
  try {
    const getOne = await Task.findById(req.params.id).populate("category");
    res.status(200).json(getOne);
  } catch (error) {
    res.status(401).json(error);
  }
});

let updatestatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const TaskStatus = await Task.findById(id);
    if (TaskStatus) {
      TaskStatus.status = status;
      await TaskStatus.save();
     return res.json(TaskStatus);
    } else {
      console.log("error on updating status");
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: "error update", error });
  }
});

let updateTask = asyncHandler(async (req, res) => {
  const { title, status, category, description, duedate } = req.body;
  const userId = req.user._id;
  const taskId = req.params._id;

  try {
    const exisitingCategory = await Category.findOne({
      _id: category,
      user: userId,
    });
    if (!exisitingCategory) {
     return res
       .status(400)
       .json({ success: false, message: "exisiting category not found" });
    }

    const update = await Task.findByIdAndUpdate(
      req.params.id,
      { title, status, category, description, duedate, user: userId },
      { new: true }
    );
    if (!update) {
      return res
        .status(401)
        .json({ success: false, message: "task is not updated" });
    }
   return res
     .status(200)
     .json({ success: true, message: "task updated successfully", update });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error occured task not updated",
      error,
    });
  }
});

let deleteTask = asyncHandler(async (req, res) => {
  const del = await Task.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: "delete successfull" });
});

module.exports = {
  createTask,
  fetchTask,
  updateTask,
  deleteTask,
  fetchsingle,
  updatestatus,
};
