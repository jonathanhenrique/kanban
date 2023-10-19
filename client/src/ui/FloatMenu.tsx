import { useAnimationOnUnmount } from '../hooks/useAnimationOnUnmount';
import FloatContainer from './FloatContainer';
import IconButton from './formUI/IconButton';

type FloatMenuConfirmationType = {
  icon: React.ReactNode;
  children: React.ReactNode;
  fineTunePosition?: [number, number];
  origin?: string;
};

export default function FloatMenu({
  children,
  icon,
  fineTunePosition = [0, 0],
  origin,
}: FloatMenuConfirmationType) {
  const { open, close, isOpen, isRunningAnimation } = useAnimationOnUnmount({
    isMounted: false,
    delay: 300,
  });

  function closeFloat() {
    close();
  }

  function openFloat() {
    if (!isRunningAnimation) {
      open();
    }
  }

  return (
    <>
      <IconButton onClick={openFloat} $open={isOpen} $animateRotation={true}>
        {icon}
      </IconButton>
      {!isRunningAnimation && !isOpen ? null : (
        <FloatContainer
          origin={origin}
          closeFn={closeFloat}
          animation={isRunningAnimation}
          pixels={fineTunePosition}
        >
          {children}
        </FloatContainer>
      )}
    </>
  );
}
