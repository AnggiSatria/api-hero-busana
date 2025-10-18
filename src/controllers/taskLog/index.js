const { z } = require("zod");
const prisma = require("../../lib/prisma");

const createTaskLogSchema = z.object({
    taskId: z.string().min(1, "TaskId harus diisi"),
    message: z.string().min(10, "Message harus minimal 10 karakter"),
    createdBy: z.string().min(1, "createdBy harus diisi"),
})

exports.createTaskLog = async (req, res) => {
    try {
        createTaskLogSchema.parse(req.body);
        const { taskId, message, createdBy } = req.body;

        const newTask = await prisma.taskLog.create({
            data: {
                taskId,
                message,
                createdBy,
            },
        });

        return res.status(201).json({
            status: "success",
            task: newTask,
        });

    } catch (error) {
       console.error("CREATE TASK LOG ERROR:", error);
        
        if (error && error.errors && Array.isArray(error.errors)) {
            return res.status(400).json({
                status: "validation_error",
                errors: error.errors.map((err) => ({
                    field: err.path?.join("."),
                    message: err.message,
                })),
            });
        }

        if (error instanceof z.ZodError) {
            return res.status(400).json({
                status: "validation_error",
                errors: error.issues.map((err) => ({
                    field: err.path?.join("."),
                    message: err.message,
                })),
            });
        }

        return res.status(500).json({
            status: "failed",
            message: "Terjadi kesalahan pada server",
        });
    }
}

exports.getTaskLogsByTaskId = async (req, res) => {
    try {
        const { taskId } = req.params;
        const taskLogs = await prisma.taskLog.findMany({
            where: { taskId },
        });
        return res.status(200).json({
            status: "success",
            taskLogs,
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Terjadi kesalahan pada server",
        });
    }
}

exports.deleteTaskLog = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.taskLog.delete({
            where: { id },
        });
        return res.status(200).json({
            status: "success",
            message: "Task log deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Terjadi kesalahan pada server",
        });
    }
}

exports.getAllTaskLogs = async (req, res) => {
    try {
        const taskLogs = await prisma.taskLog.findMany();
        return res.status(200).json({
            status: "success",
            taskLogs,
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Terjadi kesalahan pada server",
        });
    }
}

exports.updateTaskLog = async (req, res) => {
  try {
    const { id } = req.params;
    createTaskLogSchema.parse(req.body);
    const { taskId, message, createdBy } = req.body;
    const updatedTaskLog = await prisma.taskLog.update({
      where: { id },
      data: {
        taskId,
        message,
        createdBy,
        },
    });

    return res.status(200).json({
        status: "success",
        taskLog: updatedTaskLog,
    });
  } catch (error) {
    if (error && error.errors && Array.isArray(error.errors)) {
        return res.status(400).json({
            status: "validation_error",
            errors: error.errors.map((err) => ({
                field: err.path?.join("."),
                message: err.message,
                expected: err.expected ?? undefined,
                received: err.received ?? undefined,
            })),
        });
    }
    if (error instanceof z.ZodError) {
        return res.status(400).json({
            status: "validation_error",
            errors: error.issues.map((err) => ({
                field: err.path?.join("."),
                message: err.message,
            })),
        });
    }
    return res.status(500).json({
        status: "failed",
        message: "Terjadi kesalahan pada server",
    });
  }
}


