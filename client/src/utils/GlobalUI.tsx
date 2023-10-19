import { createContext, useContext, useEffect } from 'react';
import useLocalStorageState from '../hooks/useLocalStorageState';

type GlobalUI = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  darkTheme: boolean;
  toggleTheme: () => void;
};

const GlobalUIContext = createContext<GlobalUI>({} as GlobalUI);

function GlobalUIProvider({ children }: { children: React.ReactNode }) {
  const { state: sidebarOpen, setState: setSidebarOpen } = useLocalStorageState(
    'sidebar',
    true
  );
  const { state: darkTheme, setState: setDarkTheme } = useLocalStorageState(
    'theme',
    true
  );

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  function toggleTheme() {
    setDarkTheme(!darkTheme);
  }

  useEffect(() => {
    const timerID = setTimeout(() => {
      if (darkTheme) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    }, 350);

    return () => clearTimeout(timerID);
  }, [darkTheme]);

  return (
    <GlobalUIContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        darkTheme,
        toggleTheme,
      }}
    >
      {children}
    </GlobalUIContext.Provider>
  );
}

function useGlobalUI() {
  const value = useContext(GlobalUIContext);

  if (!value) throw new Error('useGlobalUI should be inside the Provider');

  return value;
}

export { GlobalUIProvider, useGlobalUI };
