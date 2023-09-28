import { styled } from 'styled-components';
import { HiMiniCheck, HiMiniXMark } from 'react-icons/hi2';
import { useAnimationOnUnmount } from '../hooks/useAnimationOnUnmount';
import FloatContainer from './FloatContainer';
import Button from './formUI/Button';
import IconButton from './formUI/IconButton';
import { SpinnerMiniR } from './SpinnerMini';

type FloatMenuConfirmationType = {
  icon: React.ReactNode;
  children: React.ReactNode;
  fineTunePosition?: [number, number];
  actionOnConfirmation: () => void;
  confirm: string;
  setConfirm: (arg: string) => void;
  isLoading?: boolean;
};

const Alert = styled.div`
  padding: 1rem 1.2rem;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--danger);
  border-radius: var(--border-radius-lg);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
`;

export default function FloatMenuConfirmation({
  children,
  icon,
  fineTunePosition = [0, 0],
  actionOnConfirmation,
  confirm,
  setConfirm,
  isLoading,
}: FloatMenuConfirmationType) {
  const { open, close, isOpen, isRunningAnimation } = useAnimationOnUnmount({
    isMounted: false,
    delay: 300,
  });

  function closeFloat() {
    close();
    setConfirm('idle');
  }

  function openFloat(e: React.MouseEvent) {
    e.stopPropagation();

    if (!isRunningAnimation) {
      open();
    }
  }

  return (
    <>
      <IconButton onClick={openFloat}>{icon}</IconButton>
      {!isRunningAnimation && !isOpen ? null : (
        <FloatContainer
          closeFn={closeFloat}
          animation={isRunningAnimation}
          pixels={fineTunePosition}
        >
          {children}
          {confirm === 'toConfirm' && (
            <Alert className="alert">
              {isLoading ? (
                <SpinnerMiniR />
              ) : (
                <>
                  <p>Confirm Deletion?</p>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Button variation="mini" onClick={closeFloat}>
                      <HiMiniXMark />
                      <span>No</span>
                    </Button>
                    <Button variation="mini" onClick={actionOnConfirmation}>
                      <HiMiniCheck />
                      <span>Yes</span>
                    </Button>
                  </div>
                </>
              )}
            </Alert>
          )}
        </FloatContainer>
      )}
    </>
  );
}
