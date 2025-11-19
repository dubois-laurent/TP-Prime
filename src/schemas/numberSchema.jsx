import { z } from "zod";


// Schéma de validation pour un nombre entre 1 et 1000
export const numberSchema = z.object({
  number: z.number().min(1).max(100),
});

// Schéma de validation pour le formulaire manuel
export const formInputSchema = z.object({
  inputNumber: z.number().min(1, "Le nombre doit être positif !").max(100, "Le nombre est trop haut ! 100 max"),
});