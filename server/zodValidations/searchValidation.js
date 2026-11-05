import { z } from "zod";

const searchText = z.string().trim().min(1).max(100).optional();

export const userSearchSchema = z
  .object({
    q: searchText,
    field: searchText,
  })
  .strict()
  .refine((query) => query.q || query.field, {
    message: "Enter a name or field of study to search",
  });
