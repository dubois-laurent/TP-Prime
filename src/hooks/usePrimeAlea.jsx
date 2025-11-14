import { useQuery } from '@tanstack/react-query';
import { fetchNumberAlea } from '../apis/fetchApi';

export function usePrimeAlea() {
    return useQuery({
        queryKey: ['prime-alea'],
        queryFn: fetchNumberAlea,
    });
}