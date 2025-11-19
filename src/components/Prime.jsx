import { Button } from "./ui/buttonGenerator";
import { usePrimeAlea } from "../hooks/usePrimeAlea";
import { usePrimeStore } from "../stores/usePrimeStore";

// Composant principal pour générer un nombre aléatoire et vérifier s'il est premier
export function Prime() {
    
    const {data, isLoading, error, refetch} = usePrimeAlea() // Hook pour récupérer un nombre aléatoire

    const { checkPrime, isPrime, number, addToHistoric, setNumber } = usePrimeStore((s) => s) // Récupère les fonctions et états du store zustand

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
  async function handleClick() {
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

  return (
    <div>

      <div>
        <h2>Génère un nombre aléatoire et vérifie s'il est premier !</h2>
      </div> 

      <div>
        {number !== null && (
          <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 mb-6 border border-neutral-700 text-center">
            <p className="text-neutral-400 mb-2 text-sm uppercase tracking-wide">Nombre actuel</p>
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

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button 
              handleClick={handleClick} 
            >
              🎲 Générer un nombre
            </Button>
            <Button 
              handleClick={handleCheckPrime} 
            >
              🔍 Vérifier
            </Button>
      </div>

    </div>
  );
}
