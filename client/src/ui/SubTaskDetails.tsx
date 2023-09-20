import { useMutation, useQueryClient } from '@tanstack/react-query';
import { styled } from 'styled-components';
import { toggleCompleted } from '../services/apiTask';
import SpinnerMini from './SpinnerMini';
import { IoCheckbox, IoSquare } from 'react-icons/io5';

const Subtask = styled.button`
  position: relative;
  font-size: 1.4rem;
  text-decoration: ${(props) => (props.isCompleted ? 'line-through' : 'none')};
  line-height: 0;
  border: none;
  border-radius: var(--border-radius-sm);
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 0.8rem 1.6rem;
  background-color: var(--color-grey-700);

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  color: ${(props) =>
    props.isCompleted ? 'var(--color-grey-300)' : 'var(--color-grey-100)'};

  opacity: ${(props) => (props.isCompleted ? '.5' : '1')};

  --hover-color: var(--color-border);

  & svg {
    font-size: 2.4rem;
    /* fill: #cd3262; */
    /* stroke: #fff; */
  }
`;

export default function SubTaskDetails({ subtask }) {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ id, completed }) => toggleCompleted(id, completed),
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
    onError: (err) => console.log('Error'),
  });

  function handleToggleCompleted(e) {
    e.preventDefault();
    mutate({ id: subtask.id, completed: !subtask.completed });
  }

  return (
    <Subtask
      disabled={isLoading}
      isCompleted={subtask.completed}
      onClick={handleToggleCompleted}
    >
      {subtask.completed ? (
        <IoCheckbox style={{ fill: '#cd3262' }} />
      ) : (
        <IoSquare style={{ fill: 'var(--color-border)' }} />
      )}
      <p style={{ opacity: isLoading ? 0.3 : 1 }}>{subtask.description}</p>
      {isLoading && <SpinnerMini />}
    </Subtask>
  );
}

// {completed ? (
//   <IoCheckbox style={{ fill: '#cd3262' }} />
// ) : (
//   <IoSquare style={{ fill: 'var(--color-border)' }} />
// )}
