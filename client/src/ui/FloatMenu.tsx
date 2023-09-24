import { useAnimationOnUnmount } from '../hooks/useAnimationOnUnmount';
import FloatContainer from './FloatContainer';
import IconButton from './IconButton';
import { useState } from 'react';

export default function FloatMenu({
  children,
  icon,
  identifier,
  fn,
  fineTunePosition = [0, 0],
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  identifier?: string;
  fn?: (value: boolean) => void;
  fineTunePosition?: [number, number];
}) {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const { open, close, isOpen, isRunningAnimation } = useAnimationOnUnmount({
    isMounted: false,
    delay: 300,
  });

  function closeFloat() {
    close();
    fn && fn(false);
  }

  function getPos() {
    if (!identifier) return [0, 0];

    const board = document.getElementById('board');
    const boardRect = board?.getBoundingClientRect();

    const el = document.getElementById(identifier);
    const rect = el?.getBoundingClientRect();

    if (rect && boardRect) {
      return [rect.left - boardRect.left, rect.top - boardRect.top];
    } else return [0, 0];
  }

  function openFloat() {
    const pos = getPos();
    setPosition(pos);

    if (!isRunningAnimation) {
      open();
      fn && fn(true);
    }
  }

  return (
    <>
      <IconButton id={identifier} open={isOpen} onClick={openFloat}>
        {icon}
      </IconButton>
      {!isRunningAnimation && !isOpen ? null : (
        <FloatContainer
          fn={closeFloat}
          animation={isRunningAnimation}
          pos={position}
          pixels={fineTunePosition}
        >
          {children}
        </FloatContainer>
      )}
    </>
  );
}
