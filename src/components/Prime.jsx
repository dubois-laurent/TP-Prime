import { Button } from "./ui/buttonGenerator";
import { usePrimeAlea } from "../hooks/usePrimeAlea";
import { usePrimeStore } from "../stores/usePrimeStore";
import { formInputSchema } from "../schemas/formSchema";
import { useEffect, useMemo, useState } from "react";

// Composant principal pour générer un nombre aléatoire et vérifier s'il est premier
export function Prime() {
    
    const {data, isLoading, error, refetch} = usePrimeAlea() // Hook pour récupérer un nombre aléatoire

    const { checkPrime, isPrime, number, addToHistoric, setNumber } = usePrimeStore((s) => s) // Récupère les fonctions et états du store zustand

    const [manualValue, setManualValue] = useState("") // État local pour la valeur saisie manuellement

    const memoizedNumber = useMemo(() => {
      [...historic]
    }, [historic]);

    // Affiche un message de chargement ou d'erreur si nécessaire
    if (isLoading) {
        return (
            <div>Chargement ...</div>
        )
    }

    // Gestion des erreurs
    if (error) {
        return (
            <div>ERREUR</div>
        )
    }


  // Gestion du clic pour générer un nouveau nombre aléatoire via l'API et le définir dans le store
  async function handleGenerateRandom() {
    const { data: newData } = await refetch()
    if (newData) {
        setNumber(newData.number)
      console.log(newData.number);
    }
  }


  // Gestion du clic pour vérifier si le nombre actuel est premier et l'ajouter à l'historique
  async function handleCheckPrime() {
    checkPrime()
    addToHistoric(number, isPrime)
  }

  // Gestion de la vérification du formulaire manuel via le schéma de validation
  async function handleManualCheck(event) {
    event.preventDefault()
    const verfiedInput = formInputSchema.parse({
        inputNumber: Number(event.target.inputNumber.value)})
    if (verfiedInput) {
        setNumber(verfiedInput.inputNumber)
        checkPrime()
        addToHistoric(verfiedInput.inputNumber, isPrime)
    }
  }

  useEffect(() => {
    handleManualCheck()
  }, [number]);

  return (
    <div>

      <div>
        <h2>Génère un nombre aléatoire et vérifie s'il est premier !</h2>
      </div> 

      <div>
        {number !== null && (
          <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 mb-6 border border-neutral-700 text-center">
            <p className="text-neutral-400 mb-2 text-sm uppercase tracking-wide">Nombre à tester</p>
            <div className="text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              {number}
            </div>
            {isPrime !== null && (
              <div className={`inline-block px-6 py-2 rounded-full font-semibold ${
                isPrime 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/50'
              }`}>
                {isPrime ? '✓ Nombre Premier' : '✗ Pas Premier'}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 mb-6">
            <Button 
              handleClick={handleGenerateRandom} 
            >
              🎲 Générer un nombre
            </Button>
            <Button 
              handleClick={handleCheckPrime} 
            >
              🔍 Vérifier
            </Button>
      </div>

      <div>
        <form className="flex items-center mb-6 gap-2 flex flex-col">
          <label>Entre un nombre entre 1 et 100 :</label>
          <input name="inputNumber" onChange={handleManualCheck} className="ml-2 p-1 rounded bg-neutral-800 border border-neutral-700"/>
        </form>
      </div>

    </div>
  );
}
