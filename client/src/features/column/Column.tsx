import { Draggable, DroppableProvided } from 'react-beautiful-dnd';
import { columnType } from '../../types/types';
import { useDeleteColumn } from './useDeleteColumn';
import Task from '../task/Task';
import ColumnHeader from './ColumnHeader';
import StyledColumn from '../../ui/StyledColumn';
import useBoard from './useBoard';
import { useCacheContext } from '../board/BoardCacheContext';

type ColumnProps = {
  provided: DroppableProvided;
  // column: columnType;
  isDraggingOver: boolean;
  // boardId: string;
  columnId: string;
};

export default function Column({
  provided,
  isDraggingOver,
  // boardId,
  columnId,
}: ColumnProps) {
  const { data: column } = useBoard(columnId);
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
        {column.tasks.map((taskId, idx) => (
          <Draggable
            isDragDisabled={false}
            draggableId={taskId}
            key={taskId}
            index={idx}
          >
            {(provided, snapshot) => (
              <Task
                // task={task}
                isDragging={snapshot.isDragging}
                provided={provided}
                // boardId={column.boardId}
                // columnIdx={columnIdx}
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
