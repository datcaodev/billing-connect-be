import { z } from "zod";
import { createCategorySchema, searchCategorySchema, updateCategorySchema } from "../schemas";

export type ICreateCategoryRequest = z.infer<typeof createCategorySchema>

export type IUpdateCategoryRequest = z.infer<typeof updateCategorySchema>

export type ISearchCategoryRequest = z.infer<typeof searchCategorySchema>
