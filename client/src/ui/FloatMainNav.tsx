import { useAnimationOnUnmount } from '../hooks/useAnimationOnUnmount';
import MainNav from './MainNav';
import { styled } from 'styled-components';
import { HiMiniChevronDown } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useGlobalUI } from './GlobalUI';
import IconButton from './IconButton';

const FloatContainer = styled.div`
  padding: 1.5rem 1rem;
  width: 260px;
  background-color: var(--color-grey-700);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);

  animation: floatFormBoard 350ms var(--bezier-ease-out);
  transition: transform 350ms var(--bezier-ease-out);

  &.toClose {
    transform: translateY(-400px);
  }
`;

export function FloatMainNav() {
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

  const { ref } = useOutsideClick(closeFloat);

  return (
    <>
      <IconButton open={isOpen} onClick={openFloat}>
        <HiMiniChevronDown />
      </IconButton>
      {!isRunningAnimation && !isOpen ? null : (
        <div
          ref={ref}
          style={{
            zIndex: '10000',
            position: 'absolute',
            top: '64px',
            left: '264px',
            clipPath: 'polygon(-25% 0, 125% 0, 125% 125%, -25% 125%)',
          }}
        >
          <FloatContainer className={isRunningAnimation ? 'toClose' : ''}>
            <MainNav floated={true} />
          </FloatContainer>
        </div>
      )}
    </>
  );
}
