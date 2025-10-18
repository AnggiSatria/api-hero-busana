const { z } = require("zod");
const prisma = require("../../lib/prisma");

exports.getUsers = async (req, res) => {
  try {

    const { fullName, email } = req.query

    const users = await prisma.user.findMany({
        where: fullName ? {
            fullName: { contains: fullName, mode: 'insensitive' }
        } : email ? {
            email: { contains: email, mode: 'insensitive' }
        } : {}
    });
    return res.status(200).json({
      status: "success",
        users,
    });
  } catch (error) {
    console.error(error);
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

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        return res.status(200).json({
            status: "success",
            user,
        });
    } catch (error) {
        console.error(error);
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

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({
            where: { id },
        });
        return res.status(200).json({
            status: "success",
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error(error);
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