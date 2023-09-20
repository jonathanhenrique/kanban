import { createContext, useState, useContext } from 'react';

const GlobalUIContext = createContext(null);

function GlobalUIProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [boardLocked, setBoardLocked] = useState(false);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <GlobalUIContext.Provider
      value={{ sidebarOpen, toggleSidebar, boardLocked, setBoardLocked }}
    >
      {children}
    </GlobalUIContext.Provider>
  );
}

function useGlobalUI() {
  const value = useContext(GlobalUIContext);

  if (!value) throw new Error('useGobalUI should be inside the Provider');

  return value;
}

export { GlobalUIProvider, useGlobalUI };
