import { z } from "zod";
import { createAreaSchema, createCountrySchema, getCountriesSchema, getAreasSchema, updateAreaSchema, updateCountrySchema, getAreasAllSchema, getCountriesByAreaSchema } from "../schemas/siteCategory.schema";

export type ICreateAreaRequest = z.infer<typeof createAreaSchema>;
export type ICreateCountryRequest = z.infer<typeof createCountrySchema>;
export type IGetCountriesRequest = z.infer<typeof getCountriesSchema>;
export type IGetAreasRequest = z.infer<typeof getAreasSchema>;
export type IUpdateAreaRequest = z.infer<typeof updateAreaSchema>;
export type IGetAreasAllRequest = z.infer<typeof getAreasAllSchema>;
export type IUpdateCountryRequest = z.infer<typeof updateCountrySchema>;
export type IGetCountriesByAreaRequest = z.infer<typeof getCountriesByAreaSchema>;
