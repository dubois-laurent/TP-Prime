import { numberSchema } from "../schemas/numberSchema.jsx";


// Simule une requête API qui retourne un nombre aléatoire après un délai de 500ms
export async function fetchNumberAlea() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const raw = { number: Math.floor(Math.random() * 100) };

  return numberSchema.parse(raw);
}