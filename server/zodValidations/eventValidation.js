import { z } from "zod";

const eventCategories = [
  "education",
  "sports",
  "workshops",
  "culture",
  "entertainment",
  "trips",
];

const isValidDate = (value) => {
  const date = new Date(`${value}T00:00:00.000Z`);

  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
};

export const createEventSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Event title must contain at least 3 characters")
      .max(100, "Event title cannot exceed 100 characters"),

    description: z
      .string()
      .trim()
      .min(10, "Event description must contain at least 10 characters")
      .max(2000, "Event description cannot exceed 2000 characters"),

    date: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Event date must use YYYY-MM-DD format")
      .refine(isValidDate, {
        message: "Event date is invalid",
      }),

    time: z
      .string()
      .trim()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Event time must use HH:mm format"),

    location: z
      .string()
      .trim()
      .min(2, "Event location must contain at least 2 characters")
      .max(200, "Event location cannot exceed 200 characters"),

    category: z.enum(eventCategories, {
      message: "Invalid event category",
    }),

    maximumParticipants: z
      .number({
        message: "Maximum participants must be a number",
      })
      .int("Maximum participants must be a whole number")
      .min(1, "Maximum participants must be at least 1")
      .max(1000, "Maximum participants cannot exceed 1000"),
  })
  .strict()
  .superRefine((data, context) => {
    const eventStart = new Date(`${data.date}T${data.time}:00`);

    if (eventStart <= new Date()) {
      context.addIssue({
        code: "custom",
        path: ["date"],
        message: "Event date and time must be in the future",
      });
    }
  });
