import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function PrimesPage() {

  const queryClient = new QueryClient();
  
  return (
    <>
      <main className="min-h-screen w-full bg-neutral-900 text-neutral-200 flex items-start justify-center p-10">
        <div className="flex gap-3 flex-wrap">
          <QueryClientProvider client={queryClient}>
            {/* Composant sur les nombres premiers */}
          </QueryClientProvider>
        </div>
      </main>
    </>
  );
}

export default PrimesPage;