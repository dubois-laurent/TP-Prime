import { usePrimeStore } from "../stores/usePrimeStore";

export function verifIsPrime(number) {
    const { primes } = usePrimeStore((s) => s);
    if (primes.includes(number)) {
        return true;
    } else {
        return false;
    }
}