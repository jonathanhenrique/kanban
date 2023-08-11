import { useEffect, useRef } from 'react';

export function useOutsideClick(callback: () => void) {
  const ref = useRef<null | HTMLElement>();

  useEffect(
    function () {
      function handleClick(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      }

      document.addEventListener('click', handleClick, true);

      return function () {
        document.removeEventListener('click', handleClick, true);
      };
    },
    [callback]
  );

  return { ref };
}
