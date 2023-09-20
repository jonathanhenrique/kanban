import { styled } from 'styled-components';
import { HiPlus, HiOutlineMinus } from 'react-icons/hi2';
import { useState } from 'react';
import Button from './Button';
import { useAnimationOnUnmount } from '../hooks/useAnimationOnUnmount';

const StyledButton = styled.button`
  margin-top: 1rem;
  background: none;
  border: none;
  padding: 1rem 1.5rem;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  color: var(--color-brand-600);
  display: flex;
  align-items: center;
  gap: 1.2rem;

  &:hover {
    background: var(--color-grey-500);
  }

  &:hover svg {
    transform: translateX(-4px);
  }

  & span {
    line-height: 0;
  }

  & svg {
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    height: 2rem;
    width: 2rem;
  }

  &.active {
    color: var(--color-brand-600);
    background: linear-gradient(90deg, #d73b54, #cd3262);
  }
`;

const StyledNewBoard = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  animation: formBoard 200ms cubic-bezier(0.4, 0, 0.2, 1);

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

export function NewBoard() {
  const [newBoard, setNewBoard] = useState('');
  const { open, close, isOpen, isRunningAnimation } = useAnimationOnUnmount({
    isMounted: false,
    delay: 250,
  });

  function handleNewBoard(e) {
    e.preventDefault();
    console.log(newBoard);
  }

  return (
    <StyledNewBoard>
      <StyledButton onClick={() => (isOpen ? close() : open())}>
        {isOpen ? <HiOutlineMinus /> : <HiPlus />}
        <span>New Board</span>
      </StyledButton>

      {!isRunningAnimation && !isOpen ? null : (
        <form onSubmit={handleNewBoard}>
          <div style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
            <FormBlock className={isRunningAnimation ? 'toClose' : ''}>
              <StyledInput
                type="text"
                value={newBoard}
                onChange={(e) => setNewBoard(e.target.value)}
                placeholder="Board Name"
              />
              <div style={{ display: 'flex' }}>
                <Button onClick={() => close()}>Cancel</Button>
                <Button>Create</Button>
              </div>
            </FormBlock>
          </div>
        </form>
      )}
    </StyledNewBoard>
  );
}
