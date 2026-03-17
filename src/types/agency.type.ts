import { z } from "zod";
import { createAgencySchema, updateAgencySchema, searchAgencySchema } from "../schemas/agency.schema";

export type ICreateAgencyRequest = z.infer<typeof createAgencySchema>;
export type IUpdateAgencyRequest = z.infer<typeof updateAgencySchema>;
export type ISearchAgencyRequest = z.infer<typeof searchAgencySchema>;
