import express from 'express';
import { addTask, deleteTask, editTask, getAllTasks, getTaskById } from '../controllers/taskController.js';
const router = express.Router();

router.route("/addTask").post(addTask);
router.route("/getTask").get(getAllTasks);
router.route("/:id").delete(deleteTask)
router.route("/edit/:id").put(editTask)
router.route("/:id").get(getTaskById)

export default router;
