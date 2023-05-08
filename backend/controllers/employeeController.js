import Employee from '../models/employeeModel.js';
import Task from '../models/taskModel.js';
export const addEmployee = async (req, res) => {
    const { firstName, lastName, department } = req.body;

    const employee = new Employee({
        firstName,
        lastName,
        department
    });

    try {
        const savedEmployee = await employee.save();
        res.json(savedEmployee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Get employee by ID
export const getEmployeeById = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findById(id).populate('tasks');
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all employees
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('tasks');
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete employee by ID
export const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit employee by ID
export const editEmployee = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, department, tasks } = req.body;

    try {
        // Find the employee by ID
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Update the employee's details
        employee.firstName = firstName;
        employee.lastName = lastName;
        employee.department = department;

        // Remove all existing tasks from the employee's tasks array
        employee.tasks = [];

        // Add the specified tasks to the employee's tasks array
        for (const taskId of tasks) {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: `Task with ID ${taskId} not found` });
            }
            employee.tasks.push(task);
        }

        // Save the updated employee object to the database
        const savedEmployee = await employee.save();

        res.json(savedEmployee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};