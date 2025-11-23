import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

import './index.css'

// Création du routeur à partir de l'arborescence des routes
const router = createRouter({ routeTree })

// Point d'entrée principal de l'application React
const root = createRoot(document.getElementById('root'))

// Rendu de l'application avec le fournisseur de routeur
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
