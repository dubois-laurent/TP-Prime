import { useQuery } from '@tanstack/react-query';
import { fetchNumberAlea } from '../apis/fetchApi';


// Hook personnalisé pour récupérer un nombre aléatoire via une requête API en utilisant tansstack query
export function usePrimeAlea() {
    return useQuery({
        queryKey: ['prime-alea'],
        queryFn: fetchNumberAlea,
    });
}