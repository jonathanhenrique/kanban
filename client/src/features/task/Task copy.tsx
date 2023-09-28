import { styled, css } from 'styled-components';
import Button from '../../ui/formUI/Button';
import {
  HiMiniEllipsisVertical,
  HiMiniTrash,
  HiMiniWrenchScrewdriver,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineTrash,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import TaskInfo from './TaskInfo';
import FloatMenu from '../../ui/FloatMenu';
import SubTaskDetails from '../subtask/SubTaskDetails';
import TaskDetails from './TaskDetails';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../../services/apiCalls';
import { produce } from 'immer';
import { useState } from 'react';
import FloatMenuConfirmation from '../../ui/FloatMenuConfirmation';
import FloatContainer from '../../ui/FloatContainer';

type Props = { $isDragging: boolean };

const StyledTask = styled.div<Props>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  position: relative;

  padding: 1rem 1.2rem;
  border: 1px solid var(--color-grey-500);
  border-radius: var(--border-radius-lg);
  background-color: var(--bg-color);

  transition: box-shadow 100ms ease-in;

  --color-shadow-1: var(--color-1);
  --color-shadow-2: var(--color-2);
  --shadow-pixels: 3px;

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

const DragDropHandler = styled.div`
  position: absolute;
  background-color: transparent;

  border-top-left-radius: var(--border-radius-lg);
  border-bottom-left-radius: var(--border-radius-lg);

  top: 0;
  left: 0;
  width: 80%;
  height: 100%;
`;

export default function Task({
  task,
  isDragging,
  // onSelectTask,
  boardId,
  updateCache,
  dnd,
}) {
  const [confirm, setConfirm] = useState('idle');
  const queryClient = useQueryClient();
  const {
    isLoading: isDeleting,
    mutate,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      const prevState = queryClient.getQueryData([boardId]);
      // const newState = prevState.board.columns.filter(
      //   (column) => column.id !== columnId
      // );

      const newState = produce(prevState, (draftState) => {
        let { columns } = draftState.board;
        const columnIdx = columns.findIndex((cl) => cl.id === task.columnId);
        let tasks = columns[columnIdx].tasks;
        tasks = tasks.filter((t) => t.id !== task.id);

        // let { columns } = draftState.board;
        // columns = columns.filter((column) => column.id !== columnId);
        draftState.board.columns[columnIdx].tasks = tasks;
      });

      queryClient.setQueryData([boardId], newState);
      updateCache(newState.board.columns);
      // queryClient.invalidateQueries({
      //   queryKey: [boardId],
      // });
    },
  });

  function deleteTaskHandler() {
    mutate(task.id);
  }

  return (
    <StyledTask $isDragging={isDragging}>
      <DragDropHandler {...dnd} />
      <TaskInfo task={task} />
      <FloatMenuConfirmation
        relativeTo="board"
        // fineTunePosition={[-175, 15]}
        fineTunePosition={[0, 0]}
        identifier={`task-${task.id}`}
        icon={<HiMiniEllipsisVertical />}
        actionOnConfirmation={deleteTaskHandler}
        confirm={confirm}
        setConfirm={setConfirm}
        isLoading={isDeleting}
      >
        <div style={{ padding: '1rem 1.2rem' }}>
          <Button variation="mini" onClick={() => setConfirm('toConfirm')}>
            <HiMiniTrash />
            <span>delete task</span>
          </Button>
          <Button disabled={true} variation="mini">
            <HiMiniWrenchScrewdriver />
            <span>edit task</span>
          </Button>
        </div>
      </FloatMenuConfirmation>
    </StyledTask>
  );
}
