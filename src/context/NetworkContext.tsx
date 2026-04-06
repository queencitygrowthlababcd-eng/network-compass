import { createContext, useContext, ReactNode } from 'react';
import { useNetworkSimulation } from '@/hooks/useNetworkSimulation';

type NetworkContextType = ReturnType<typeof useNetworkSimulation>;

const NetworkContext = createContext<NetworkContextType | null>(null);

export function NetworkProvider({ children }: { children: ReactNode }) {
  const simulation = useNetworkSimulation();
  return (
    <NetworkContext.Provider value={simulation}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const ctx = useContext(NetworkContext);
  if (!ctx) throw new Error('useNetwork must be used inside NetworkProvider');
  return ctx;
}
