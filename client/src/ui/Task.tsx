import { Draggable } from 'react-beautiful-dnd';
import { taskType, subtaskType } from '../types/types';

export default function Task({
  taskData,
  index,
}: {
  taskData: taskType;
  index: number;
}) {
  return (
    <Draggable draggableId={taskData.task} index={index}>
      {(provided) => (
        <li
          style={{
            padding: '1rem 2rem',
            borderRadius: '8px',
            backgroundColor: 'red',
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h4>{taskData.task}</h4>
          <p>0 of 5 subtasks</p>
        </li>
      )}
    </Draggable>
  );
}
