import { useMutation, useQueryClient } from '@tanstack/react-query';
import { styled } from 'styled-components';
import { toggleCompleted } from '../services/apiCalls';
import SpinnerMini from './SpinnerMini';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { subtaskType } from '../types/types';

type Props = { $isCompleted: boolean };

const Subtask = styled.button<Props>`
  position: relative;
  font-size: 1.4rem;
  /* text-decoration: ${(props) =>
    props.$isCompleted ? 'line-through' : 'none'}; */
  line-height: 0;
  border: none;
  border-radius: var(--border-radius-sm);
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 0.8rem 1.6rem;
  background-color: var(--color-grey-500);
  position: relative;

  &:not(:last-of-type) {
    margin-bottom: 0.8rem;
  }

  color: var(--color-grey-100);

  opacity: ${(props) => (props.$isCompleted ? '.5' : '1')};

  & svg {
    transition: all 200ms linear;
    height: 2rem;
    width: 2rem;
    fill: var(--color-2);
  }

  &::after {
    content: '';
    transition: transform 200ms linear;
    display: block;
    height: 2px;
    width: 86%;
    position: absolute;
    top: calc(50% - 1px);
    left: 9%;
    background-color: var(--color-2);

    transform-origin: 0 0;
    transform: ${(props) => (props.$isCompleted ? 'scaleX(1)' : 'scaleX(0)')};
  }
`;

export default function SubTaskDetails({ subtask }: { subtask: subtaskType }) {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      toggleCompleted(id, completed),
    onSuccess: () => {
      queryClient.setQueryData(['currTask'], ({ task }) => {
        const subtasks = [...task.subTasks];
        const updatedSubtasks = subtasks.map((st) =>
          st.id === subtask.id ? { ...st, completed: !st.completed } : st
        );

        console.log(updatedSubtasks);
        return { task: { ...task, subTasks: updatedSubtasks } };
      });
      queryClient.invalidateQueries({ queryKey: ['currBoard'] });
    },
    onError: (err: Error) => console.log(`Error: ${err.message}`),
  });

  function handleToggleCompleted(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    mutate({ id: subtask.id, completed: !subtask.completed });
  }

  return (
    <Subtask
      disabled={isLoading}
      $isCompleted={subtask.completed}
      onClick={handleToggleCompleted}
    >
      {subtask.completed ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
      <p style={{ opacity: isLoading ? 0.3 : 1 }}>{subtask.description}</p>
      {isLoading && <SpinnerMini />}
    </Subtask>
  );
}
