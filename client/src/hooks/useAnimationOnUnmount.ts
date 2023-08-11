import { useEffect, useState, useCallback } from 'react';

type UseAnimationType = {
  isMounted: boolean;
  delay?: number;
};

export function useAnimationOnUnmount({
  isMounted = false,
  delay,
}: UseAnimationType) {
  const [animationState, setAnimationState] = useState(
    isMounted ? 'mounted' : 'unmounted'
  );
  const isRunningAnimation = animationState === 'toUnmount';
  const isOpen = animationState === 'mounted';

  const open = useCallback(() => setAnimationState('mounted'), []);
  const close = useCallback(() => setAnimationState('toUnmount'), []);

  useEffect(
    function () {
      if (!delay || delay === 0) return;
      let timerId: number;
      if (animationState === 'toUnmount') {
        timerId = setTimeout(() => {
          setAnimationState('unmounted');
        }, delay);
      }

      return function () {
        clearTimeout(timerId);
      };
    },

    [animationState, setAnimationState, delay]
  );

  if (!delay || delay === 0) return { open, close, isOpen };

  return { open, close, isOpen, isRunningAnimation };
}
