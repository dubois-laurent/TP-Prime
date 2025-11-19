
// Vérifie si un nombre est premier en le cherchant dans une liste de nombres premiers qui se trouve dans le store usePrimeStore.js
export function verifIsPrime(number, primes) {
    return primes.includes(number);
}