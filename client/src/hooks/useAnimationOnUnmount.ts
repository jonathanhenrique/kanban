import { useEffect, useState, useCallback } from 'react';

type UseAnimationType = {
  isMounted: boolean;
  delay?: number;
  fn?: () => void;
};

export function useAnimationOnUnmount({
  isMounted = false,
  delay,
  fn,
}: UseAnimationType): {
  open: () => void;
  close: () => void;
  isOpen: boolean;
  isRunningAnimation: boolean;
} {
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
          fn && fn();
          setAnimationState('unmounted');
        }, delay);
      }

      return function () {
        clearTimeout(timerId);
      };
    },

    [animationState, setAnimationState, delay, fn]
  );

  // if (!delay || delay === 0) return { open, close, isOpen };

  return { open, close, isOpen, isRunningAnimation };
}
