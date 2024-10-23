const express = require("express");
const protect = require("../utilities/protect");
const {
  createTask,
  fetchTask,
  updateTask,
  deleteTask,
  fetchsingle,
  updatestatus,
} = require("../controllers/taskcontroller");
const {
  newCategory,
  fetchCategories,
  deleteCategories,
} = require("../controllers/categorycontroller");
const router = express.Router();

router.route("/tasks").post(protect, createTask);
router.route("/tasks").get(protect, fetchTask);
router.route("/tasks/:id").put(protect, updateTask);
router.route("/tasks/:id").delete(protect, deleteTask);
router.route("/tasks/:id").get(protect, fetchsingle);
router.route("/tasks/:id/status").put(protect, updatestatus);

router.route("/categories").post(protect, newCategory);
router.route("/categories").get(protect, fetchCategories);
router.route("/categories/:id").delete(protect, deleteCategories);

module.exports = router;
