import Task from '../models/taskModel.js';
import Employee from '../models/employeeModel.js';

// Add Task
export const addTask = async (req, res) => {
    const { assignedTo, description, priority } = req.body;

    try {
        const employee = await Employee.findById(assignedTo);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const task = new Task({
            assignedTo,
            description,
            priority
        });

        // Save the task to the database
        await task.save();

        // Add the task to the employee's tasks array and save the employee to the database
        employee.tasks.push(task);
        await employee.save();

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete task by ID
export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all tasks
// Get all tasks with offset pagination
export const getAllTasks = async (req, res) => {
    try {
        const { offset = 0, limit = 10 } = req.query;

        const total = await Task.countDocuments();

        const tasks = await Task.find().populate('assignedTo', 'firstName lastName department')
            .sort({ createdAt: -1 }) // Sort tasks by creation date, descending order
            .skip(parseInt(offset)) // Skip the specified number of tasks
            .limit(parseInt(limit)) // Limit the number of tasks returned

        const modifiedTasks = tasks.map((task) => {
            if (!task.assignedTo) {
                task.assignedTo = "Unassigned";
            }
            return task;
        });

        res.json({ tasks: modifiedTasks, total });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// export const getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find().populate('assignedTo', 'firstName lastName department');
//         const modifiedTasks = tasks.map(task => {
//             if (!task.assignedTo) {
//                 task.assignedTo = "Unassigned";
//             }
//             return task;
//         });
//         res.json(modifiedTasks);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// Get task by ID
export const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id).populate('assignedTo', 'firstName lastName department');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Edit task by ID
export const editTask = async (req, res) => {
    const { id } = req.params;
    const { assignedTo, description, priority, completed } = req.body;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (assignedTo) {
            const employee = await Employee.findById(assignedTo);
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            task.assignedTo = employee._id;
        }

        if (description) {
            task.description = description;
        }

        if (priority) {
            task.priority = priority;
        }

        if (completed !== undefined) {
            task.completed = completed;
        }

        await task.save();

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
