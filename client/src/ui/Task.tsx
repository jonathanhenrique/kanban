import { styled, css } from 'styled-components';
import Button from './Button';
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineTrash,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2';
import Modal from './Modal';
import TaskInfo from './TaskInfo';

const StyledTask = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
  border: 1px solid var(--color-border-dark);
  border-radius: var(--border-radius-lg);

  background-color: var(--color-grey-700);
  background-image: url('noise-bg-soft.png');
  background-position: 0 0;
  background-size: 200px 200px;

  transition: box-shadow 100ms ease-in;

  --color-shadow-1: #d73b54;
  --color-shadow-2: #cd3262;
  --shadow-pixels: 2px;

  ${(props) => {
    if (!props.$isDragging) return '';
    return css`
      box-shadow: 0 1px var(--shadow-pixels) 0 var(--color-shadow-1),
        0 -1px var(--shadow-pixels) 0 var(--color-shadow-2),
        1px 0 var(--shadow-pixels) 0 var(--color-shadow-1),
        -1px 0 var(--shadow-pixels) 0 var(--color-shadow-2);
    `;
  }};
`;

const ButtonsGroup = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export default function Task({ task, isDragging, onSelectTask }) {
  return (
    <StyledTask $isDragging={isDragging}>
      <TaskInfo task={task} />
      <ButtonsGroup>
        <Modal.Trigger fn={() => onSelectTask(task)} opens="details">
          <Button variation="task" icon={<HiOutlineArrowTopRightOnSquare />}>
            Open
          </Button>
        </Modal.Trigger>

        <Modal.Trigger fn={() => onSelectTask(task)} opens="edit">
          <Button variation="task" icon={<HiOutlineWrenchScrewdriver />}>
            Edit
          </Button>
        </Modal.Trigger>

        <Button variation="task" icon={<HiOutlineTrash />}>
          Delete
        </Button>
      </ButtonsGroup>
    </StyledTask>
  );
}
