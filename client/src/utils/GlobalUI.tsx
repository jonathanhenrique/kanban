import { createContext, useState, useContext, useEffect } from 'react';
import useLocalStorageState from '../hooks/useLocalStorageState';

type GlobalUI = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  darkTheme: boolean;
  toggleTheme: () => void;
  boardLocked: boolean;
  setBoardLocked: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalUIContext = createContext<GlobalUI>({} as GlobalUI);

function GlobalUIProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useLocalStorageState('sidebar', true);
  const [darkTheme, setDarkTheme] = useLocalStorageState('theme', true);
  const [boardLocked, setBoardLocked] = useState(false);

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
    }, 300);

    return () => clearTimeout(timerID);
  }, [darkTheme]);

  return (
    <GlobalUIContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        boardLocked,
        setBoardLocked,
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
