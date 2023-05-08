import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
