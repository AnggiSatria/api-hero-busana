const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../../lib/prisma");


const registerSchema = z.object({
  fullName: z.string().min(3, "Full name harus minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  role: z.enum(["USER", "ADMIN"]), // Sesuai enum di Prisma (huruf besar)
  password: z.string().min(6, "Password minimal 6 karakter"),
});

exports.register = async (req, res) => {
  try {
    const parsedData = registerSchema.parse(req.body);
    const { fullName, email, password, role } = parsedData;


    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(422).json({
        status: "error",
        message: "Email sudah terdaftar!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role, 
      },
    });


    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });


    return res.status(201).json({
      status: "success",
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
      token,
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
};


const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

exports.login = async (req, res) => {
  try {
    const parsedData = loginSchema.parse(req.body);
    const { email, password } = parsedData;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Email tidak ditemukan",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(403).json({
        status: "error",
        message: "Password salah",
      });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { token },
    });

    return res.status(200).json({
      status: "success",
      message: "Login berhasil",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      token,
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
};