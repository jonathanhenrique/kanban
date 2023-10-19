import { styled } from 'styled-components';
import { HiMiniCheck, HiMiniXMark } from 'react-icons/hi2';
import { useAnimationOnUnmount } from '../hooks/useAnimationOnUnmount';
import FloatContainer from './FloatContainer';
import Button from './formUI/Button';
import IconButton from './formUI/IconButton';

type FloatMenuConfirmationType = {
  icon: React.ReactNode;
  children: React.ReactNode;
  fineTunePosition?: [number, number];
  actionOnConfirmation: () => void;
  confirm: string;
  setConfirm: (arg: string) => void;
  disabled?: boolean;
};

const Alert = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--danger);
  border-radius: var(--border-radius-lg);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default function FloatMenuConfirmation({
  children,
  icon,
  fineTunePosition = [0, 0],
  actionOnConfirmation,
  confirm,
  setConfirm,
  disabled = false,
}: FloatMenuConfirmationType) {
  const { open, close, isOpen, isRunningAnimation } = useAnimationOnUnmount({
    isMounted: false,
    delay: 300,
    fn: () => setConfirm('idle'),
  });

  function closeFloat() {
    close();
  }

  function openFloat(e: React.MouseEvent) {
    e.stopPropagation();

    if (!isRunningAnimation) {
      open();
    }
  }

  return (
    <>
      <IconButton
        onClick={openFloat}
        $open={isOpen}
        $animateRotation={false}
        disabled={disabled}
      >
        {icon}
      </IconButton>
      {!isRunningAnimation && !isOpen ? null : (
        <FloatContainer
          closeFn={closeFloat}
          animation={isRunningAnimation}
          pixels={fineTunePosition}
        >
          {children}
          {confirm === 'toConfirm' && (
            <Alert className="alert">
              <p style={{ fontWeight: '600' }}>Confirm Deletion?</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variation="mini" onClick={closeFloat}>
                  <HiMiniXMark />
                  <span>no</span>
                </Button>
                <Button
                  variation="mini"
                  onClick={() => {
                    closeFloat();
                    actionOnConfirmation();
                  }}
                >
                  <HiMiniCheck />
                  <span>yes</span>
                </Button>
              </div>
            </Alert>
          )}
        </FloatContainer>
      )}
    </>
  );
}
