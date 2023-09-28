import { createContext, useState, useContext } from 'react';
import { columnType } from '../../types/types';

type CacheType = {
  cache: columnType[];
  setCache: React.Dispatch<React.SetStateAction<columnType[]>>;
};

const CacheContext = createContext<CacheType>({} as CacheType);

function CacheContextProvider({ children }: { children: React.ReactNode }) {
  const [cache, setCache] = useState<columnType[]>([]);

  return (
    <CacheContext.Provider value={{ cache, setCache }}>
      {children}
    </CacheContext.Provider>
  );
}

function useCacheContext() {
  const value = useContext(CacheContext);

  if (!value) {
    throw new Error('useCacheContext should be inside CacheContextProvider');
  }

  return value;
}

export { CacheContextProvider, useCacheContext };
