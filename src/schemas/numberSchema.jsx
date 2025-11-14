import { z } from "zod";

export const numberSchema = z.object({
  number: z.number().min(1).max(1000),
});