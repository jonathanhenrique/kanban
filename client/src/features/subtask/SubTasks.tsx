import { useState } from 'react';
import { styled } from 'styled-components';
import Button from '../../ui/formUI/Button';
import SubTask from './SubTask';

const StyledSubtasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function SubTasks() {
  const [subtasks, setSubtasks] = useState([]);

  function handleDelete(idx) {
    setSubtasks((s) => {
      const newState = [...s];
      newState.splice(idx, 1);
      return newState;
    });
  }

  return (
    <StyledSubtasks>
      {subtasks.map((st, idx: number) => (
        <SubTask
          key={`subtask_${idx}`}
          handleDelete={() => handleDelete(idx)}
        />
      ))}
      <Button
        variation="secondary"
        handleClick={() => setSubtasks((s) => [...s, ''])}
      >
        + Add new subtask
      </Button>
    </StyledSubtasks>
  );
}
