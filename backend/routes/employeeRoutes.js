import express from 'express';
import { addEmployee, deleteEmployee, editEmployee, getAllEmployees, getEmployeeById } from "../controllers/employeeController.js";
const router = express.Router();

router.route("/addEmployee").post(addEmployee);
router.route("/getEmployee").get(getAllEmployees);
router.route("/:id").delete(deleteEmployee)
router.route("/:id").get(getEmployeeById)
router.route("/edit/:id").put(editEmployee)


export default router;
