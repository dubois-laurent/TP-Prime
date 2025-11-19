import { create } from "zustand";
import { verifIsPrime } from "../services/verifIsPrime";

// State initial du store contenant la liste des nombres premiers connus jusqu'à 100 / number à tester / isPrime résultat de la vérification / historique des tests
const initialState = {
    number: null,
    isPrime: null,
    primes : [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97],
    historic: [],
}

// Store zustand pour gérer le nombre à tester et vérifier s'il est premier
export const usePrimeStore = create((set, get) => ({
    ...initialState,

    // Met à jour le nombre à tester et réinitialise le résultat de la vérification
    setNumber: (n) => set({ number: n, isPrime: null }),

    // Vérifie si le nombre actuel est premier en utilisant le service verifIsPrime
    checkPrime: () => {

        const { number, primes } = get()

        if (number === null) return
        console.log("Vérification du nombre :", number);

        const isPrime = verifIsPrime(number, primes)

        set({ isPrime: isPrime })
    },

    // Historique des nombres testés
    addToHistoric: (n, isPrime) => {

        const { historic } = get()

        const newTestedNumber = { number: n, isPrime: isPrime }

        set({ historic: [...historic, newTestedNumber] })
    },

}));