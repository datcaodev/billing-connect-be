import { any, z } from "zod";

export const basePaginationRequestSchema = z.object({
  page: z.string().optional(),
  size: z.string().optional(),
  sortBy: z.string().optional(),
});

export const basePaginationQuerySchema = z.object({
  content: z.array(any()),
  total: z.number(),
});

export type IBasePaginationQuerySchema = z.infer<
  typeof basePaginationQuerySchema
>;
export type IBasePaginationRequest = z.infer<
  typeof basePaginationRequestSchema
>;

