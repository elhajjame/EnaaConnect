import { z } from "zod";

export const notificationParamsSchema = z
  .object({
    notificationId: z
      .string()
      .trim()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid notification ID"),
  })
  .strict();
