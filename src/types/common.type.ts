import { z } from "zod";
import { guidSchema } from "../schemas/common.schema";

export type IGuidSchemaRequest = z.infer<typeof guidSchema>
