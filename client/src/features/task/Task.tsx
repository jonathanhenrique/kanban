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
import Button from '../../ui/formUI/Button';
import useDeleteTask from './useDeleteTask';
import Modal from '../../ui/Modal';
import TaskInfo from './TaskInfo';
import TaskDetails from './TaskDetails';
import useGetTask from './useGetTask';
import { memo } from 'react';

type TaskProps = {
  provided: DraggableProvided;
  isDragging: boolean;
  taskId: string;
};

function Task({ provided, isDragging, taskId }: TaskProps) {
  const { data: task } = useGetTask(taskId);
  const [confirm, setConfirm] = useState('idle');
  const { mutate } = useDeleteTask(taskId);

  function deleteTask() {
    mutate(taskId);
  }

  if (!task) return null;

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
            <TaskInfo taskId={taskId} />
            <FloatMenuConfirmation
              fineTunePosition={[95, 25]}
              icon={<HiMiniEllipsisVertical />}
              actionOnConfirmation={deleteTask}
              confirm={confirm}
              setConfirm={setConfirm}
            >
              <Button variation="mini" onClick={() => setConfirm('toConfirm')}>
                <HiMiniTrash />
                <span>delete task</span>
              </Button>
              <Button disabled={true} variation="mini">
                <HiMiniWrenchScrewdriver />
                <span>edit task</span>
              </Button>
            </FloatMenuConfirmation>
          </StyledTask>
        </li>
      </Modal.Trigger>
      <Modal.Content name={task.id}>
        <TaskDetails taskId={task.id} />
      </Modal.Content>
    </>
  );
}

const TaskMemo = memo(Task);

export default TaskMemo;
