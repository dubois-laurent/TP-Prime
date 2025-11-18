import { usePrimeStore } from "../stores/usePrimeStore";

export function verifIsPrime(number, primes) {
    return primes.includes(number);
}