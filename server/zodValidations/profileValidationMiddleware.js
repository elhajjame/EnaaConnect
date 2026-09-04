import { z } from "zod";

  export const updateProfileSchema = z
    .object({
      fullName: z
        .string()
        .trim()
        .min(3, "Full name must contain at least 3 characters")
        .max(100, "Full name cannot exceed 100 characters")
        .optional(),

      fieldOfStudy: z
        .string()
        .trim()
        .min(1, "Field of study cannot be empty")
        .max(100, "Field of study cannot exceed 100 characters")
        .optional(),

      academicYear: z
        .string()
        .trim()
        .min(1, "Academic year cannot be empty")
        .max(50, "Academic year cannot exceed 50 characters")
        .optional(),

      biography: z
        .string()
        .trim()
        .max(500, "Biography cannot exceed 500 characters")
        .optional(),

      interests: z
        .array(
          z
            .string()
            .trim()
            .min(1, "An interest cannot be empty")
            .max(50, "An interest cannot exceed 50 characters"),
        )
        .max(20, "You cannot add more than 20 interests")
        .optional(),
    })
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
      message: "Provide at least one profile field to update",
    });

  export const publicProfileParamsSchema = z
    .object({
      userId: z
        .string()
        .trim()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
    })
    .strict();