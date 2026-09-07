import { z } from "zod";

  export const createPostSchema = z
    .object({
      content: z
        .string()
        .trim()
        .min(1, "Post content cannot be empty")
        .max(2000, "Post content cannot exceed 2000 characters"),
    })
    .strict();
 export const updatePostSchema = z
    .object({
      content: z
        .string()
        .trim()
        .min(1, "Post content cannot be empty")
        .max(2000, "Post content cannot exceed 2000 characters"),
    })
    .strict();

  export const postParamsSchema = z
    .object({
      postId: z
        .string()
        .trim()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid post ID"),
    })
    .strict();