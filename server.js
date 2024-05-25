require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT} port.`);
});

let tasks = [];
let nextId = 1;
app.get("/tasks", async (req, res) => {
    return res.status(200).json({
        success: true,
        tasks: tasks
    });
})

app.post("/tasks", async (req, res) => {
    const { title, description, status, dueDate } = req.body;
    if (!title || !description || !status || !dueDate) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }

    const newTask = {
        id: nextId++,
        title: title,
        description: description,
        status: status,
        dueDate: dueDate
    };

    tasks.push(newTask);

    return res.status(201).json({
        success: true,
        task: newTask
    });
})

app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === id);
    if (task) {
        return res.status(200).json({
            success: true,
            task: task
        });
    } else {
        return res.status(404).json({
            success: false,
            message: 'Task not found'
        });
    }
});

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, description, status, dueDate } = req.body;
    if (!title || !description || !status || !dueDate) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Task not found'
        });
    }
    const updatedTask = { ...tasks[taskIndex], title, description, status, dueDate };
    tasks[taskIndex] = updatedTask;
    return res.status(200).json({
        success: true,
        task: updatedTask
    });
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Task not found'
        });
    }
    tasks.splice(taskIndex, 1);
    return res.status(200).json({
        success: true,
        message: 'Task deleted successfully'
    });
});