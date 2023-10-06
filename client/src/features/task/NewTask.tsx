import { styled } from 'styled-components';
import { useReducer } from 'react';
import Button from '../../ui/formUI/Button';
import { HiOutlineTrash, HiPlusSmall } from 'react-icons/hi2';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateTask } from './useCreateTask';
import { useParams } from 'react-router-dom';
import IconButton from '../../ui/formUI/IconButton';
import { SpinnerMiniR } from '../../ui/SpinnerMini';
import FormErrorMessage from '../../ui/formUI/FormErrorMessage';
import StyledInput from '../../ui/formUI/Input';
import StyledSelect from '../../ui/formUI/Select';
import StyledTextArea from '../../ui/formUI/TextArea';
import {
  DESCRIPTION_PLACEHOLDER,
  SUBTASK_PLACEHOLDERS,
} from '../../utils/constants';
import { reducer, initialState } from './NewTaskReducer';
import { boardType } from '../../types/types';
import useColumns from './useColumns';

type Props = { $grid: null | string };

const StyledForm = styled.form`
  min-width: 50rem;
  position: relative;
`;

const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.8rem;
`;

const FormBlockRow = styled.div<Props>`
  display: grid;
  grid-template-columns: ${(props) => (props.$grid ? props.$grid : '1fr 1fr')};
  column-gap: 2rem;
`;

const SubtasksContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const SubTask = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & input {
    transform-origin: center right;
    animation: scaleX 250ms var(--bezier-ease-out);
    flex-basis: 90%;
  }
`;

const Error = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  text-align: center;

  & h3 {
    font-size: 2.4rem;
  }

  & img {
    width: 20rem;
  }
`;

export default function NewTask() {
  const { boardId } = useParams();
  const columns = useColumns(boardId);
  const { isCreatingTask, mutate, error, reset, isError } =
    useCreateTask(boardId);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { title, description, subtasks, columnId } = state;

  // const queryClient = useQueryClient();
  // const data = queryClient.getQueryData<{ board: boardType }>([
  //   'userBoard',
  //   boardId,
  // ]);

  // const columns = data
  //   ? data.board.columns.map((column) => ({
  //       id: column.id,
  //       name: column.name,
  //     }))
  //   : null;

  // if (!data) {
  //   return (
  //     <Error>
  //       <div>
  //         <img src="error.svg" alt="Error Illustration" />
  //       </div>
  //       <div>
  //         <h3>You need to select a Board first!</h3>
  //         <p>To create your task, you will need a Boards and a Column</p>
  //       </div>
  //     </Error>
  //   );
  // } else if (!columns || columns.length === 0) {
  //   return (
  //     <Error>
  //       <div>
  //         <img src="error.svg" alt="Error Illustration" />
  //       </div>
  //       <div>
  //         <h3>You need to select a Board first!</h3>
  //         <p>To create your task, you will need a Boards and a Column</p>
  //       </div>
  //     </Error>
  //   );
  // }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!columns || columns.length === 0) return;

    const column = columnId || columns[0].id;
    const filteredSubtasks = subtasks.filter((st) => st.length > 0);
    mutate({ title, description, subTasks: filteredSubtasks, columnId: column });
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormBlockRow $grid="1fr 160px">
        <FormBlock>
          <label htmlFor="title">Title</label>
          <StyledInput
            disabled={isCreatingTask}
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
          <label htmlFor="column">Column</label>
          <StyledSelect
            disabled={isCreatingTask}
            name="column"
            id="column"
            defaultValue={columns[0].id}
            onChange={(event) =>
              dispatch({ type: 'changeColumn', payload: event.target.value })
            }
          >
            {columns.map((opt, idx) => (
              <option key={`column_${idx}`} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </StyledSelect>
        </FormBlock>
      </FormBlockRow>
      <FormBlock>
        <label htmlFor="description">Description</label>
        <StyledTextArea
          disabled={isCreatingTask}
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
          rows={3}
        ></StyledTextArea>
      </FormBlock>
      <FormBlock>
        <label htmlFor="subtasks">Subtasks</label>
        <SubtasksContainer id="subtasks">
          {subtasks.map((st, idx: number) => (
            <SubTask key={`subtask_${idx}`}>
              <StyledInput
                disabled={isCreatingTask}
                value={st}
                onChange={(event) =>
                  dispatch({
                    type: 'updateSubtask',
                    payload: { index: idx, input: event.target.value },
                  })
                }
                placeholder={`e.g. ${SUBTASK_PLACEHOLDERS[idx]}`}
              />
              <IconButton
                tabIndex={-1}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({ type: 'deleteSubtask', payload: idx });
                }}
              >
                <HiOutlineTrash />
              </IconButton>
            </SubTask>
          ))}
        </SubtasksContainer>
      </FormBlock>
      <FormBlockRow $grid={null}>
        <Button
          disabled={subtasks.length >= 5 || isCreatingTask ? true : false}
          variation="secondary"
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: 'newSubtask' });
          }}
        >
          <HiPlusSmall />
          <span>new Subtask</span>
        </Button>
        <Button variation="primary" disabled={isCreatingTask}>
          {isCreatingTask ? <SpinnerMiniR /> : <HiPlusSmall />}
          <span>{isCreatingTask ? 'Creating...' : 'Create Task'}</span>
        </Button>
      </FormBlockRow>
      {isError && (
        <div
          style={{
            position: 'absolute',
            bottom: '130px',
            right: '0',
            width: '235px',
          }}
        >
          <FormErrorMessage
            reset={reset}
            error={(error as TypeError).message}
          />
        </div>
      )}
    </StyledForm>
  );
}
