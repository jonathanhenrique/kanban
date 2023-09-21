import { useState, useEffect } from 'react';

function useLocalStorageState(key, defaultState) {
  const [state, setState] = useState(() => {
    const storageState = localStorage.getItem(key);

    if (!storageState) return defaultState;
    else return storageState === 'true';
  });

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageState;
