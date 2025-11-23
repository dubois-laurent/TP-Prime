import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Prime } from '../components/Prime'
import { History } from '../components/History';

function PrimesPage() {


  // Création d'une instance de QueryClient pour gérer le cache et les requêtes
  const queryClient = new QueryClient();
  
  return (
    <>
      <main className="min-h-screen w-full bg-black text-neutral-200 flex items-center justify-center p-10">
        <div className="flex gap-3 flex-wrap items-center justify-center">
          <QueryClientProvider client={queryClient}>
            <Prime />
            <History />
          </QueryClientProvider>
        </div>
      </main>
    </>
  );
}

export default PrimesPage;