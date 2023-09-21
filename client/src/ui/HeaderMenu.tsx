import { useAnimationOnUnmount } from '../hooks/useAnimationOnUnmount';
import { HiMiniChevronDown } from 'react-icons/hi2';
import { useGlobalUI } from '../utils/GlobalUI';
import FloatContainer from './FloatContainer';
import IconButton from './IconButton';

export default function HeaderMainNav({
  children,
  icon,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const { setBoardLocked } = useGlobalUI();

  const { open, close, isOpen, isRunningAnimation } = useAnimationOnUnmount({
    isMounted: false,
    delay: 300,
  });

  function closeFloat() {
    close();
    setBoardLocked(false);
  }

  function openFloat() {
    if (!isRunningAnimation) {
      open();
      setBoardLocked(true);
    }
  }

  return (
    <>
      <IconButton open={isOpen} onClick={openFloat}>
        {icon}
      </IconButton>
      {!isRunningAnimation && !isOpen ? null : (
        <FloatContainer fn={closeFloat} animation={isRunningAnimation}>
          {children}
        </FloatContainer>
      )}
    </>
  );
}
