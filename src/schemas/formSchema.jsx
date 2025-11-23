import { z } from 'zod';


// Schéma de validation pour le formulaire manuel
export const formInputSchema = z.object({
  inputNumber: z.number().min(1, { message: "Le nombre doit être positif !" }).max(100, { message: "Le nombre est trop haut ! 100 max" }),
});