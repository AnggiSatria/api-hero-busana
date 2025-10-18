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
router.post("/task", auth, createTask);
router.get("/tasks", getTasks);
router.get("/task/:id", getTaskById);
router.put("/task/:id", auth, createTask);
router.delete("/task/:id", auth, deleteTask);

// Task Log
router.post("/task-log", auth, createTaskLog);
router.get("/task-log/task/:taskId", auth, getTaskLogsByTaskId);
router.get("/task-logs", auth, getAllTaskLogs);
router.put("/task-log/:id", auth, updateTaskLog);
router.delete("/task-log/:id", auth, deleteTaskLog);

// users
router.get("/users", auth, getUsers);
router.get("/user/:id", auth, getUserById);
router.delete("/user/:id", auth, deleteUser);


module.exports = router;
