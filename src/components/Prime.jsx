import { Button } from "./ui/buttonGenerator";
import { usePrimeAlea } from "../hooks/usePrimeAlea";
import { useState } from 'react'
import { usePrimeStore } from "../stores/usePrimeStore";

export function Prime() {
    
    const {data, isLoading, error, refetch} = usePrimeAlea()

    const { checkPrime, isPrime, number } = usePrimeStore((s) => s)

    if (isLoading) {
        return (
            <div>Chargement ...</div>
        )
    }

    if (error) {
        return (
            <div>ERREUR</div>
        )
    }

  async function handleClick() {
    const { data: newData } = await refetch()
    if (newData) {
        usePrimeStore.getState().setNumber(newData.number)
      console.log(newData.number);
    }
  }

  return (
    <div>
      <h2>Génère un nombre aléatoire et vérifie s'il est premier !</h2>
      <Button handleClick={handleClick}>Générer un nombre aléatoire</Button>
      <Button handleClick={checkPrime}>Vérifier si c'est un nombre premier</Button>
      {isPrime === false && <p>Le nombre {number} n'est pas un nombre premier.</p>}
        {isPrime === true && <p>Le nombre {number} est un nombre premier !</p>}
    </div>
  );
}
