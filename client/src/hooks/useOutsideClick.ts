import { useEffect, useRef } from 'react';

export function useOutsideClick(callback: () => void) {
  const ref = useRef<HTMLElement>();

  useEffect(
    function () {
      function handleClick(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      }

      document.addEventListener('mousedown', handleClick, true);

      return function () {
        document.removeEventListener('mousedown', handleClick, true);
      };
    },
    [callback]
  );

  return { ref };
}
