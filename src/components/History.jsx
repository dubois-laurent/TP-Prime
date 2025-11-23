import { usePrimeStore } from "../stores/usePrimeStore";
import { MainCTA } from "./ui/buttonGenerator";

export function History() {
    //stocke le tableau localement dans le composant
    const history = usePrimeStore((s) => s.history);
    //clearHistory videra le tableau quand on cliquera sur "effacer"
    const clearHistory = usePrimeStore((s) => s.clearHistory);

    if (history.length === 0) {
        return null; // N'affiche rien si l'historique est vide
    }

    return (
        <div className="w-full max-w-2xl mt-8">
            <div className="bg-neutral-800/30 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">
                        📊 Historique des vérifications
                    </h3>
                    <MainCTA
                        handleClick={clearHistory}
                        className="text-sm text-neutral-400 hover:text-red-400 transition-colors"
                    >
                        🗑️ Effacer
                    </MainCTA>
                </div>
                
                {/*boucle sur chaque élément du tableau*/}
                <div className="space-y-2">
                    {history.map((entry, index) => (
                        <div
                            key={index}
                            className={`flex justify-between items-center p-3 rounded-lg ${
                                entry.isPrime //gère le css si est premier ou non
                                    ? 'bg-green-500/10 border border-green-500/30' 
                                    : 'bg-red-500/10 border border-red-500/30'
                            }`}
                        >
                            {/*affichage du nombre et s'il est premier ou non*/}
                            <div className="flex items-center gap-3">
                                <span className={`text-2xl font-bold ${
                                    entry.isPrime ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {entry.number}
                                </span>
                                <span className={`text-sm font-semibold ${
                                    entry.isPrime ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {entry.isPrime ? '✓ Premier' : '✗ Pas Premier'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}