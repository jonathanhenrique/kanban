import { Draggable, DroppableProvided } from 'react-beautiful-dnd';
import Task from '../task/Task';
import ColumnHeader from './ColumnHeader';
import StyledColumn from '../../ui/StyledColumn';
import useGetColumn from './useGetColumn';
import useDeleteColumn from './useDeleteColumn';

type ColumnProps = {
  provided: DroppableProvided;
  isDraggingOver: boolean;
  columnId: string;
};

export default function Column({
  provided,
  isDraggingOver,
  columnId,
}: ColumnProps) {
  const { data: column } = useGetColumn(columnId);
  const { mutate } = useDeleteColumn(column?.boardId, column?.id);

  function deleteColumnHandler() {
    if (!column) return;
    mutate(column.id);
  }

  if (!column) return null;

  return (
    <StyledColumn $isDraggingOver={isDraggingOver}>
      <ColumnHeader title={column.name} deleteColumn={deleteColumnHandler} />
      <ul ref={provided.innerRef} {...provided.droppableProps}>
        {column.tasks.map((taskId, idx) => (
          <Draggable
            isDragDisabled={false}
            draggableId={taskId}
            key={taskId}
            index={idx}
          >
            {(provided, snapshot) => (
              <Task
                isDragging={snapshot.isDragging}
                provided={provided}
                taskId={taskId}
              />
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </ul>
    </StyledColumn>
  );
}
