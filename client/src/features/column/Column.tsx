import { Draggable, DroppableProvided } from 'react-beautiful-dnd';
import { columnType } from '../../types/types';
import { useDeleteColumn } from './useDeleteColumn';
import Task from '../task/Task';
import ColumnHeader from './ColumnHeader';
import StyledColumn from '../../ui/StyledColumn';

type ColumnProps = {
  provided: DroppableProvided;
  column: columnType;
  isDraggingOver: boolean;
};

export default function Column({
  provided,
  column,
  isDraggingOver,
}: ColumnProps) {
  const { isDeleting, mutate } = useDeleteColumn(column.boardId, column.id);

  function deleteColumnHandler() {
    mutate(column.id);
  }

  return (
    <StyledColumn $isDraggingOver={isDraggingOver}>
      <ColumnHeader
        title={column.name}
        deleteColumn={deleteColumnHandler}
        isLoading={isDeleting}
      />
      <ul ref={provided.innerRef} {...provided.droppableProps}>
        {column.tasks.map((task, idx) => (
          <Draggable
            isDragDisabled={false}
            draggableId={task.id}
            key={task.id}
            index={idx}
          >
            {(provided, snapshot) => (
              <Task
                task={task}
                isDragging={snapshot.isDragging}
                provided={provided}
                boardId={column.boardId}
              />
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </ul>
    </StyledColumn>
  );
}
