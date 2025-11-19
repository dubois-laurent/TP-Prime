TP Prime — generateur de nombres premiers
=========================================

Exercice pratique realise par Camille et Laurent pour explorer un flux React moderne autour de la generation et de la validation de nombres premiers. Le projet combine TanStack Router/Query, Zustand et Zod afin d illustrer une separation claire des responsabilites entre navigation, requetes asynchrones, logique metier et validation.

Fonctionnalites clefs
---------------------
- bouton pour generer un nouveau nombre (React Query + cache automatique)
- controle de validite (schema `numberSchema`) et affichage convivial de l etat (chargement, succes, erreur)
- verification immediate de la primalite via le store Zustand et un cache local de nombres premiers
- navigation TanStack Router avec layout racine, liens actifs et Devtools integres

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
	components/  # Prime + UI Button
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
