import { useAnimationOnUnmount } from '../hooks/useAnimationOnUnmount';
import FloatContainer from './FloatContainer';
import IconButton from './formUI/IconButton';
import { useState } from 'react';

export default function FloatMenu({
  children,
  icon,
  identifier,
  fn,
  fineTunePosition = [0, 0],
  relativeTo,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  identifier?: string;
  fn?: () => void;
  fineTunePosition?: [number, number];
  relativeTo: string;
}) {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const { open, close, isOpen, isRunningAnimation } = useAnimationOnUnmount({
    isMounted: false,
    delay: 300,
  });

  function closeFloat() {
    close();
    fn && fn();
    // fn && fn(false);
  }

  function getPos() {
    if (!identifier) return [0, 0];

    const relative = document.getElementById(relativeTo);
    const relativeRect = relative?.getBoundingClientRect();

    const el = document.getElementById(identifier);
    const rect = el?.getBoundingClientRect();

    if (rect && relativeRect) {
      return [rect.left - relativeRect.left, rect.top - relativeRect.top];
    } else return [0, 0];
  }

  function openFloat(e) {
    e.stopPropagation();
    const pos = getPos();
    setPosition(pos);

    if (!isRunningAnimation) {
      open();
      // fn && fn(true);
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
