const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth");
const { createTask, getTasks, getTaskById, deleteTask } = require("../controllers/task");
const { auth } = require("../middlewares/auth");
const { createTaskLog, getTaskLogsByTaskId, getAllTaskLogs, updateTaskLog, deleteTaskLog } = require("../controllers/taskLog");
const { getUsers, getUserById, deleteUser } = require("../controllers/users");

// Auth
router.post("/auth/register", register);
router.post("/auth/login", login);


// Task
router.post("/tasks", auth, createTask);
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.delete("/tasks/:id", auth, deleteTask);

// Task Log
router.post("/task-logs", auth, createTaskLog);
router.get("/task-logs/task/:taskId", auth, getTaskLogsByTaskId);
router.get("/task-logs", auth, getAllTaskLogs);
router.put("/task-logs/:id", auth, updateTaskLog);
router.delete("/task-logs/:id", auth, deleteTaskLog);

// users
router.get("/users", auth, getUsers);
router.get("/users/:id", auth, getUserById);
router.delete("/users/:id", auth, deleteUser);


module.exports = router;
