import { Button } from "./ui/buttonGenerator";
import { usePrimeAlea } from "../hooks/usePrimeAlea";
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4">

      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Génère un nombre aléatoire et vérifie s'il est premier !
        </h2>
      </div> 

      <div className="w-full max-w-2xl">
        <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 mb-6 border border-neutral-700 text-center">
          {number !== null ? (
            <>
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
            </>
          ) : (
            <p className="text-neutral-400 text-lg py-12">
              Clique sur "Générer un nombre" pour commencer
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center">
            <Button 
              handleClick={handleClick} 
            >
              🎲 Générer un nombre
            </Button>
            <Button 
              handleClick={checkPrime} 
              disabled={number === null}
            >
              🔍 Vérifier
            </Button>
      </div>

    </div>
  );
}
