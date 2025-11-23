Prime — generateur de nombres premiers
=========================================

Exercice pratique realisé pour explorer un flux React moderne autour de la generation et de la validation de nombres premiers. Le projet combine TanStack Router/Query, Zustand et Zod afin d'illustrer une separation claire des responsabilites entre navigation, requetes asynchrones, logique metier et validation.

Fonctionnalites clefs
---------------------
- bouton pour generer un nouveau nombre (React Query + cache automatique)
- input manuel controle avec validation immediate via `formInputSchema` (Zod) et messages d erreur visibles sous le champ
- affichage en temps reel du nombre courant dans la tuile centrale, qu il provienne du random ou d une saisie
- verification immediate de la primalite via le store Zustand et un cache local de nombres premiers
- navigation TanStack Router avec layout racine, liens actifs et Devtools integres

Flux utilisateur
----------------
1. Generer un nombre (ou le saisir) met a jour le store `usePrimeStore` et synchronise la valeur affichee.
2. Les contraintes (1 a 100) sont valides par Zod et affichent des messages contextuels sans bloquer l UI.
3. Le bouton unique "Verifier le nombre" relance la verification, quel que soit l origine de la valeur, et le store conserve le resultat pour l UI.

Stack technique
---------------
- React 19 + Vite (rolldown-vite)
- TanStack Router & React Query
- Zustand pour l etat metier
- Zod pour la validation
- Tailwind CSS 4 pour le style
- ESLint 9 pour la qualite du code

Arborescence en bref
--------------------
```
src/
	apis/        # fetchNumberAlea (API simulee + validation Zod)
	components/  # Prime + UI Button + formulaires controles
	hooks/       # usePrimeAlea (TanStack Query)
	pages/       # HomePage et PrimesPage
	routes/      # Router file-based TanStack
	schemas/     # numberSchema
	services/    # verifIsPrime logique metier pure
	stores/      # Zustand (usePrimeStore)
```

Prerequis
---------
- Node.js 20+ (recommande)
- npm 10+

Installation et lancement
-------------------------
```
npm install
npm run dev
```

Binome
------
- Camille Paillou — conception UI, services et logique metier
- Laurent Dubois — logique metier, store et integration React Query

Merci pour votre lecture et bons nombres premiers !
