import { styled } from 'styled-components';
import {
  HiPlusSmall,
  HiMiniXMark,
  HiMiniPlusCircle,
  HiMiniXCircle,
} from 'react-icons/hi2';
import { useState } from 'react';
import Button from './Button';
import { useAnimationOnUnmount } from '../hooks/useAnimationOnUnmount';
import { SpinnerMiniR } from './SpinnerMini';
import FormErrorMessage from './FormErrorMessage';

type Props = {
  $minWidth: string | undefined;
  $isOpen: boolean;
  $centered: boolean;
};

type MiniFormType = {
  placeholder: string;
  buttonText: string;
  minWidth?: string;
  centered: boolean;
  action: (input: string) => void;
  reset: () => void;
  loading?: boolean;
  error: null | string;
};

const StyledMiniForm = styled.div<Props>`
  min-width: ${(props) => props.$minWidth};
  display: flex;
  flex-direction: column;

  transition: transform 200ms var(--bezier-ease-out);

  transform: ${(props) => {
    if (!props.$centered) return '';
    else return props.$isOpen ? 'translateY(0)' : 'translateY(4rem)';
  }};
`;

const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  position: relative;

  animation: formBoard 250ms cubic-bezier(0.4, 0, 0.2, 1);

  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &.toClose {
    transform: translateY(-120px);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  background-color: transparent;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
  padding: 1rem;
`;

export default function MiniForm({
  placeholder,
  buttonText,
  minWidth,
  centered = false,
  action,
  loading,
  error,
  reset,
}: MiniFormType) {
  const [userInput, setUserInput] = useState('');
  const { open, close, isOpen, isRunningAnimation } = useAnimationOnUnmount({
    isMounted: false,
    delay: 250,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    action(userInput);
    setUserInput('');
  }

  function toggleMiniForm() {
    if (isOpen) close();
    else open();

    if (error) reset();
  }

  return (
    <StyledMiniForm $minWidth={minWidth} $centered={centered} $isOpen={isOpen}>
      <Button
        disabled={loading}
        variation={centered ? 'linkCentered' : 'link'}
        onClick={toggleMiniForm}
      >
        {isOpen ? <HiMiniXCircle /> : <HiMiniPlusCircle />}
        <span>{buttonText}</span>
      </Button>

      {!isRunningAnimation && !isOpen ? null : (
        <form onSubmit={handleSubmit}>
          <div style={{ clipPath: 'polygon(0 0, 101% 0, 101% 200%, 0 200%)' }}>
            <FormBlock className={isRunningAnimation ? 'toClose' : ''}>
              <StyledInput
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={placeholder}
                disabled={loading}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variation="secondary"
                  type="reset"
                  disabled={loading}
                  onClick={() => {
                    setUserInput('');
                    close();
                  }}
                >
                  <HiMiniXMark />
                  <span>Cancel</span>
                </Button>
                <Button
                  variation="primary"
                  disabled={userInput.length < 2 || loading}
                >
                  {loading ? <SpinnerMiniR /> : <HiPlusSmall />}
                  <span>Create</span>
                </Button>
              </div>
              {error && <FormErrorMessage reset={reset} error={error} />}
            </FormBlock>
          </div>
        </form>
      )}
    </StyledMiniForm>
  );
}
