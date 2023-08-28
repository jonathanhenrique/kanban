import { Draggable } from 'react-beautiful-dnd';
import { taskType, subtaskType } from '../types/types';
import { styled } from 'styled-components';
import Button from './Button';
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineTrash,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2';

const StyledTask = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* gap: 1rem; */

  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
  border: 1px solid var(--color-border-dark);
  border-radius: var(--border-radius-lg);

  background-color: var(--color-grey-700);
  background-image: url('noise-bg-soft.png');
  background-position: 0 0;
  background-size: 200px 200px;

  background-color: ${(props) =>
    props.isDragging ? 'var(--bg-color)' : 'var(--color-grey-700)'};
`;

const ButtonsGroup = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export default function Task({ task, isDragging }) {
  return (
    <StyledTask isDragging={isDragging}>
      <div>
        <h4>{task.title}</h4>
        <p>{`${task.subTasks.reduce(
          (acc, st) => acc + st.completed,
          0
        )} subtasks completed`}</p>
      </div>
      <ButtonsGroup>
        <Button variation="task" icon={<HiOutlineArrowTopRightOnSquare />}>
          Open
        </Button>

        <Button variation="task" icon={<HiOutlineWrenchScrewdriver />}>
          Edit
        </Button>

        <Button variation="task" icon={<HiOutlineTrash />}>
          Delete
        </Button>
      </ButtonsGroup>
    </StyledTask>
  );
}
