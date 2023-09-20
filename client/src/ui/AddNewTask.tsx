import { styled } from 'styled-components';
import { useReducer } from 'react';
import Button from './Button';
import { HiOutlineTrash } from 'react-icons/hi2';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateTask } from '../hooks/useCreateTask';
import { useParams } from 'react-router-dom';

const Heading = styled.h2`
  font-weight: 500;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const StyledForm = styled.form`
  min-width: 50rem;
`;

const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StyledInput = styled.input`
  background-color: transparent;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
  padding: 1rem;
`;

const StyledTextArea = styled.textarea`
  background-color: transparent;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
  padding: 1rem;
  resize: none;
`;

const StyledSubtasks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SubTask = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & input {
    flex-basis: 90%;
  }
`;

const StyledSelect = styled.select`
  appearance: none;
  background-color: transparent;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" stroke-width="2.5" stroke="%236362c6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>');
  background-repeat: no-repeat;
  background-position-y: 50%;
  background-position-x: 98%;

  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
  padding: 1rem;

  cursor: pointer;

  & option {
    background-color: var(--color-grey-500);
    padding: 1rem;
  }
`;

const DESCRIPTION_PLACEHOLDER =
  "e.g. It's always good to take a break. This 14 minutes will recharge the batteries a little.";

const SUBTASK_PLACEHOLDERS = [
  'Make coffee',
  'Drink coffee and smile',
  'Meditate',
  'Take a selfie',
  'Take a 5 minutes break',
];

type StateType = {
  title: string;
  description: string;
  subtasks: string[];
  status: string;
};

type ActionType = {
  type:
    | 'changeTitle'
    | 'changeDescription'
    | 'newSubtask'
    | 'deleteSubtask'
    | 'changeStatus'
    | 'updateSubtask';
  payload?: string | number | object;
};

const initialState: StateType = {
  title: '',
  description: '',
  subtasks: ['', ''],
  status: '',
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'changeTitle':
      return { ...state, title: action.payload };
    case 'changeDescription':
      return { ...state, description: action.payload };
    case 'newSubtask':
      return { ...state, subtasks: [...state.subtasks, ''] };
    case 'deleteSubtask': {
      const newState = [...state.subtasks];
      newState.splice(action.payload, 1);
      return { ...state, subtasks: newState };
    }
    case 'updateSubtask': {
      const newState = [...state.subtasks];
      newState[action.payload.index] = action.payload.input;
      return { ...state, subtasks: newState };
    }
    case 'changeStatus': {
      return { ...state, status: action.payload };
    }
    default:
      throw new Error('Action not found');
  }
}

export default function AddNewTask() {
  const { boardId } = useParams();
  const { isCreatingTask, mutate } = useCreateTask();
  const [{ title, description, subtasks, status }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData([boardId]);

  const columns = data
    ? data.board.columns.map((column) => ({
        id: column.id,
        name: column.name,
      }))
    : null;

  // console.log(columns);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const columnId = status || columns[0].id;

    const order =
      data.board.columns.find((column) => column.id === columnId).tasks.length +
      1;
    mutate({ title, description, subtasks, columnId, order });
    // console.log({ title, description, subtasks, columnId, order });
  }

  console.log('Inside new Task');

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div style={{ opacity: isCreatingTask ? '.5' : '1' }}>
        <Heading>Add new Task</Heading>
        <FormBlock>
          <label htmlFor="title">Title</label>
          <StyledInput
            id="title"
            name="title"
            placeholder="e.g. Take coffee break"
            value={title}
            onChange={(event) =>
              dispatch({ type: 'changeTitle', payload: event.target.value })
            }
          />
        </FormBlock>
        <FormBlock>
          <label htmlFor="description">Description</label>
          <StyledTextArea
            id="description"
            name="description"
            placeholder={DESCRIPTION_PLACEHOLDER}
            value={description}
            onChange={(event) =>
              dispatch({
                type: 'changeDescription',
                payload: event.target.value,
              })
            }
            rows={4}
          ></StyledTextArea>
        </FormBlock>
        <FormBlock>
          <label htmlFor="subtasks">Subtasks</label>
          <StyledSubtasks>
            {subtasks.map((st, idx: number) => (
              <SubTask key={`subtask_${idx}`}>
                <StyledInput
                  value={st}
                  onChange={(event) =>
                    dispatch({
                      type: 'updateSubtask',
                      payload: { index: idx, input: event.target.value },
                    })
                  }
                  placeholder={`e.g. ${SUBTASK_PLACEHOLDERS[idx]}`}
                />
                <Button
                  variation="icon"
                  handleClick={(event) => {
                    event.preventDefault();
                    dispatch({ type: 'deleteSubtask', payload: idx });
                  }}
                >
                  <HiOutlineTrash />
                </Button>
              </SubTask>
            ))}
            <Button
              variation="secondary"
              handleClick={(event) => {
                event.preventDefault();
                dispatch({ type: 'newSubtask' });
              }}
            >
              + Add new subtask
            </Button>
          </StyledSubtasks>
        </FormBlock>
        <FormBlock>
          <label htmlFor="status">Status</label>
          <StyledSelect
            name="status"
            id="status"
            defaultValue={columns[0].id}
            onChange={(event) =>
              dispatch({ type: 'changeStatus', payload: event.target.value })
            }
          >
            {columns.map((opt, idx) => (
              <option key={`column_${idx}`} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </StyledSelect>
        </FormBlock>
        <FormBlock>
          <Button variation="primary">Create Task</Button>
        </FormBlock>
      </div>
    </StyledForm>
  );
}
