const { z } = require("zod");
const prisma = require("../../lib/prisma");

const createTaskSchema = z.object({
  title: z.string().min(3, "Title harus minimal 3 karakter"),
  description: z.string().min(10, "Description harus minimal 10 karakter"),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Start date tidak valid" }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "End date tidak valid" }),
  status: z.enum(["BELUM_DIMULAI", "SEDANG_DIKERJAKAN","SELESAI"]),
  assignTo: z.string().min(1, "AssignTo harus diisi"),
  userId: z.string().min(1, "UserId harus diisi"),
})

exports.createTask = async (req, res) => {
    try {
        createTaskSchema.parse(req.body);
        const { title, description, startDate, endDate, status, assignTo, userId } = req.body;

        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                status,
                assignTo,
                userId,
            },
        });

        return res.status(201).json({
            status: "success",
            task: newTask,
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

exports.getTasks = async (req, res) => {
  try {
    const { title, description } = req.query;

    const where = {};

    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }

    if (description) {
      where.description = { contains: description, mode: 'insensitive' };
    }

    const tasks = await prisma.task.findMany({ where });

    return res.status(200).json({
      status: "success",
      tasks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "failed",
      message: "Terjadi kesalahan pada server",
    });
  }
};


exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            return res.status(404).json({
                status: "error",
                message: "Task tidak ditemukan",
            });
        }
        return res.status(200).json({
            status: "success",
            task,
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Terjadi kesalahan pada server",
        });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await prisma.task.delete({
            where: { id },
        });
        return res.status(200).json({
            status: "success",
            message: "Task berhasil dihapus",
            task,
        });
    } catch (error) {
        if (error.code === 'P2025') {
        return res.status(404).json({
            status: "error",
            message: "Task tidak ditemukan",
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
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        createTaskSchema.parse(req.body);
        const { title, description, startDate, endDate, status, assignTo, userId } = req.body;
        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                title,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                status,
                assignTo,
                userId,
            },
        });
        return res.status(200).json({  
            status: "success",
            message: "Task berhasil diperbarui",
            task: updatedTask,
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                status: "error",
                message: "Task tidak ditemukan",
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
};

