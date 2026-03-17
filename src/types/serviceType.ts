import { z } from "zod";
import { createServiceSchemas, getServicePublicSchemas, SearchServiceSchemas, updateServiceParamsSchemas, updateServiceSchemas } from "../schemas/serviceType.schemas";

export type ICreateServiceRequest = z.infer<typeof createServiceSchemas>
export type IUpdateServiceRequest = z.infer<typeof updateServiceSchemas>
export type IUpdateServiceParamsRequest = z.infer<typeof updateServiceParamsSchemas>
export type ISearchServiceRequest = z.infer<typeof SearchServiceSchemas>
export type IGetServicePublicRequest = z.infer<typeof getServicePublicSchemas>