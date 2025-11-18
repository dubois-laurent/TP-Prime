import { create } from "zustand";
import { verifIsPrime } from "../services/verifIsPrime";

const initialState = {
    number: null,
    isPrime: null,
    primes : [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
}

export const usePrimeStore = create((set, get) => ({
    ...initialState,
    setNumber: (n) => set({ number: n, isPrime: null }),

    checkPrime: () => {
        const { number, primes } = get()
        if (number === null) return
        console.log("Vérification du nombre :", number);
        const isPrime = verifIsPrime(number, primes)

        set({ isPrime: isPrime })
    },
}));