import { styled } from 'styled-components';
import { useReducer } from 'react';
import { HiOutlineTrash, HiPlusSmall } from 'react-icons/hi2';
import Button from '../../ui/formUI/Button';
import { useCreateTask } from './useCreateTask';
import { useParams } from 'react-router-dom';
import IconButton from '../../ui/formUI/IconButton';
import { SpinnerMiniR } from '../../ui/SpinnerMini';
import StyledInput from '../../ui/formUI/Input';
import StyledSelect from '../../ui/formUI/Select';
import StyledTextArea from '../../ui/formUI/TextArea';
import {
  DESCRIPTION_PLACEHOLDER,
  SUBTASK_PLACEHOLDERS,
} from '../../utils/constants';
import { reducer, initialState } from './NewTaskReducer';
import useColumns from '../column/useColumns';
import FormBlock from '../../ui/formUI/FormBlock';

type Props = { $grid: null | string };

const StyledForm = styled.form`
  min-width: 50rem;
  position: relative;
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
    flex-basis: 90%;
    transform-origin: center left;
    animation: scaleY 250ms var(--bezier-ease-out);
  }
`;

export default function NewTask() {
  const { boardId } = useParams();
  const { data: columns } = useColumns(boardId ?? '');
  const { isCreatingTask, mutate } = useCreateTask();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { title, description, subtasks, columnId } = state;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!columns || columns.length === 0) return;

    const column = columnId || columns[0].id;
    const filteredSubtasks = subtasks.filter((st) => st.length > 0);
    mutate({
      title,
      description,
      subTasks: filteredSubtasks,
      columnId: column,
    });
  }

  if (!columns || columns.length === 0) return null;

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
        <label htmlFor="subtasks-1">Subtasks</label>
        <SubtasksContainer>
          {subtasks.map((st, idx: number) => (
            <SubTask key={`subtask_${idx}`}>
              <StyledInput
                id={`subtasks-${idx + 1}`}
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
          <span>{isCreatingTask ? 'Creating task...' : 'Create Task'}</span>
        </Button>
      </FormBlockRow>
    </StyledForm>
  );
}
