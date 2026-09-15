import { z } from "zod";

const enaaEmailPattern = /^[a-zA-Z0-9._%+-]+@enaa\.ma$/i;

const emailSchema = z
  .string({
    message: "Email must be a string",
  })
  .trim()
  .toLowerCase()
  .regex(enaaEmailPattern, "A valid @enaa.ma email is required");

const passwordSchema = z
  .string({
    message: "Password must be a string",
  })
  .min(8, "Password must contain at least 8 characters")
  .max(128, "Password cannot exceed 128 characters");

export const registerSchema = z
  .object({
    fullName: z
      .string({
        message: "Full name must be a string",
      })
      .trim()
      .min(3, "Full name must contain at least 3 characters")
      .max(100, "Full name cannot exceed 100 characters"),

    email: emailSchema,

    password: passwordSchema,

    confirmPassword: z.string({
      message: "Password confirmation must be a string",
    }),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z
  .object({
    email: emailSchema,

    password: z
      .string({
        message: "Password must be a string",
      })
      .min(1, "Password is required")
      .max(128, "Password cannot exceed 128 characters"),
  })
  .strict();

export const forgetPasswordSchema = z
  .object({
    email: emailSchema,
  })
  .strict();

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,

    confirmPassword: z.string({
      message: "Password confirmation must be a string",
    }),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const resetPasswordTokenSchema = z
  .object({
    token: z
      .string()
      .trim()
      .regex(/^[a-fA-F0-9]{64}$/, "Invalid password reset token"),
  })
  .strict();
