import { Button } from "./ui/buttonGenerator";
import { usePrimeAlea } from "../hooks/usePrimeAlea";
import { usePrimeStore } from "../stores/usePrimeStore";
import { formInputSchema } from "../schemas/formSchema";
import { useState } from "react";

// Composant principal pour générer un nombre aléatoire et vérifier s'il est premier
export function Prime() {
    
    const {data, isLoading, error, refetch} = usePrimeAlea() // Hook pour récupérer un nombre aléatoire

    const { checkPrime, isPrime, number, addToHistoric, setNumber, historic } = usePrimeStore((s) => s) // Récupère les fonctions et états du store zustand

    const [manualValue, setManualValue] = useState("") // État local pour la valeur saisie manuellement


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

    // Appel de la fonction refetch pour obtenir un nouveau nombre et mettre à jour l'état
    const { data: newData } = await refetch()
    if (newData) {
        setNumber(newData.number)
        setManualValue(String(newData.number))
      console.log(newData.number);
    }
  }


  // Gestion du clic pour vérifier si le nombre actuel est premier et l'ajouter à l'historique
  async function handleCheckPrime() {
    const result = checkPrime()

    // Ajoute le résultat au tableau historique, obligé d'utiliser typeof pour gérer le cas où result est null (ça arrivera jamais)
    addToHistoric(number, typeof result === "boolean" ? result : isPrime)
  }

  // Gestion de la saisie manuelle et mise à jour en temps réel
  function handleManualChange(event) {
    const value = event.target.value
    setManualValue(value)

    // Si le champ est vide, réinitialise le nombre dans le store
    if (value === "") {
      setNumber(null)
      return
    }

    // On s'assure que la valeur est bien un nombre avant de valider avec le schéma
    const numericValue = Number(value)
    if (Number.isNaN(numericValue)) {
      return
    }

    try {
      const { inputNumber } = formInputSchema.parse({ inputNumber: numericValue })
      setNumber(inputNumber)
    } catch (err) {
      console.error("Erreur de validation :", err.errors)
    }

  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">

      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Génère un nombre aléatoire et vérifie s'il est premier !
        </h2>
      </div> 

      <div>
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
        <form className="flex items-center mb-6 gap-2 flex flex-col" onSubmit={(event) => event.preventDefault()}>
          <label>Entre un nombre entre 1 et 100 :</label>
          <input name="inputNumber" value={manualValue} onChange={handleManualChange} className="ml-2 p-1 rounded bg-neutral-800 border border-neutral-700"/>
        </form>
      </div>

    </div>
  );
}
