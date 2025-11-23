import { MainCTA } from "./ui/buttonGenerator";
import { usePrimeAlea } from "../hooks/usePrimeAlea";
import { usePrimeStore } from "../stores/usePrimeStore";
import { formInputSchema } from "../schemas/formSchema";
import { useState } from "react";
import { ZodError } from "zod";

// Composant principal pour générer un nombre aléatoire et vérifier s'il est premier
export function Prime() {

  const { data, isLoading, error, refetch } = usePrimeAlea() // Hook pour récupérer un nombre aléatoire

  const { checkPrime, isPrime, number, setNumber } = usePrimeStore((s) => s) // Récupère les fonctions et états du store zustand 

  const [manualValue, setManualValue] = useState("") // État local pour la valeur saisie manuellement
  const [errorSchema, setErrorSchema] = useState(""); // État local pour les erreurs de validation du FormInputSchema


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
  function handleCheckPrime() {
    checkPrime() // L'historique est maintenant géré automatiquement dans checkPrime()
  }

  // Gestion de la saisie manuelle et mise à jour en temps réel
  function handleManualChange(event) {
    const value = event.target.value
    setManualValue(value)

    // Si le champ est vide, réinitialise le nombre dans le store
    if (value === "") {
      setNumber(null)
      setErrorSchema("")
      return
    }

    // On s'assure que la valeur est bien un nombre // car le state est un string de base // avant de valider avec le schéma
    const numericValue = Number(value)
    if (Number.isNaN(numericValue)) {
      return
    }

    try {
      const { inputNumber } = formInputSchema.parse({ inputNumber: numericValue })
      setNumber(inputNumber)
      setErrorSchema("")
    } catch (err) {
      const errorMessage = err instanceof ZodError // Merci l'IA, sans elle j'y serais pas arrivé // en gros Zod renvoie ses erreur via .issues et non .errors
        ? err.issues[0]?.message ?? "Erreur de validation"
        : "Erreur de validation"
      console.log("Erreur de validation :", errorMessage);
      setErrorSchema(errorMessage)
    }

  }


  return (
    <div className="flex flex-col items-center justify-center p-4">

      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Inscris ou génère un nombre aléatoire et vérifie s'il est premier !
        </h2>
      </div>

      {/* Affichage du nombre et résultat */}
      <div className="w-full max-w-2xl">
        <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 mb-6 border border-neutral-700 text-center">
          <p className="text-neutral-400 mb-2 text-sm uppercase tracking-wide">Nombre à tester</p>
          <div className="text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            {number}
          </div>
          {isPrime !== null && (
            <div className={`inline-block px-6 py-2 rounded-full font-semibold ${isPrime
              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
              : 'bg-red-500/20 text-red-400 border border-red-500/50'
              }`}>
              {isPrime ? '✓ Nombre Premier' : '✗ Pas Premier'}
            </div>
          )}
        </div>
      </div>

      {/* input de saisie et bouton générer */}
      <div className="w-full max-w-2xl mb-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* Input manuel */}
          <div>
            <form className="flex items-center mb-6 gap-2 flex flex-col" onSubmit={(event) => event.preventDefault()}>
              <label>Entre un nombre entre 1 et 100 :</label>
              <input name="inputNumber" value={manualValue} onChange={handleManualChange} className="ml-2 p-1 rounded bg-neutral-800 border border-neutral-700" />
              {errorSchema && (
                <p className="text-red-500 text-sm mt-1 text-center">{errorSchema}</p>
              )}
            </form>
          </div>

          {/* Bouton générer */}
          <MainCTA
            handleClick={handleGenerateRandom}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-500 disabled:hover:to-purple-600 transform hover:scale-105 active:scale-95"
          >
            🎲 Générer un nombre
          </MainCTA>

        </div>
      </div>

      {/* bouton vérifier */}
      <div className="w-full max-w-2xl flex justify-center">
        <MainCTA
          handleClick={handleCheckPrime}
          disabled={number === null || errorSchema !== ""}
          className="px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-green-500 disabled:hover:to-emerald-600 transform hover:scale-105 active:scale-95"
        >
          🔍 Vérifier le nombre
        </MainCTA>
      </div>
    </div>
  );
}
