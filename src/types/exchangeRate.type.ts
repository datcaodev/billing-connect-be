import { z } from "zod";
import { createExchangeRateSchema, searchExchangeRateHistorySchema } from "../schemas/exchangeRate.schema";

export type ICreateExchangeRateRequest = z.infer<typeof createExchangeRateSchema>
export type ISearchExchangeRateHistoryRequest = z.infer<typeof searchExchangeRateHistorySchema>