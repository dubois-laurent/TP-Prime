import { z } from "zod";


// Schéma de validation pour un nombre entre 1 et 1000
export const numberSchema = z.object({
  number: z.number().min(1).max(100),
});