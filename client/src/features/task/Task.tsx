import { useState } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import {
  HiMiniEllipsisVertical,
  HiMiniTrash,
  HiMiniWrenchScrewdriver,
} from 'react-icons/hi2';
import FloatMenuConfirmation from '../../ui/FloatMenuConfirmation';
import DragDropHandler from '../../ui/DragDropHandler';
import StyledTask from '../../ui/StyledTask';
import { taskType } from '../../types/types';
import Button from '../../ui/formUI/Button';
import useDeleteTask from './useDeleteTask';
import Modal from '../../ui/Modal';
import TaskInfo from './TaskInfo';
import TaskDetails from './TaskDetails';

type TaskProps = {
  provided: DraggableProvided;
  task: taskType;
  isDragging: boolean;
  boardId: string;
  // columnIdx: number;
  // taskIdx: number;
};

export default function Task({
  provided,
  task,
  isDragging,
  boardId,
}: TaskProps) {
  // const { data: task2 } = useBoardTask(boardId, columnIdx, taskIdx);
  const [confirm, setConfirm] = useState('idle');
  const { isDeleting, mutate } = useDeleteTask(boardId, task.columnId, task.id);
  // const { isDeleting, mutate } = useDeleteTask(boardId, task.columnId, task.id);

  function deleteTask() {
    mutate(task.id);
  }

  return (
    <>
      <Modal.Trigger opens={task.id}>
        <li
          className="mb-1rem"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <StyledTask $isDragging={isDragging}>
            <DragDropHandler dndProps={provided.dragHandleProps} />
            <TaskInfo task={task} />
            <FloatMenuConfirmation
              fineTunePosition={[0, 0]}
              icon={<HiMiniEllipsisVertical />}
              actionOnConfirmation={deleteTask}
              confirm={confirm}
              setConfirm={setConfirm}
              isLoading={isDeleting}
            >
              <div style={{ padding: '1rem 1.2rem' }}>
                <Button
                  variation="mini"
                  onClick={() => setConfirm('toConfirm')}
                >
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
        </li>
      </Modal.Trigger>
      <Modal.Content name={task.id}>
        <TaskDetails
          currTask={task.id}
          // columnIdx={columnIdx}
          // taskIdx={taskIdx}
        />
      </Modal.Content>
    </>
  );
}
