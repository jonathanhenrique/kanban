import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { useUpdateBoard } from './useUpdateBoard';
import { changeColumn, reorder } from '../../utils/cacheOperations';
import StyledBoard from '../../ui/StyledBoard';
import Spinner from '../../ui/Spinner';
import useLoadBoard from './useLoadBoard';
import NewColumn from '../column/NewColumn';
import useColumns from '../column/useColumns';
import { columnCacheType } from '../../types/types';
import Columns from '../column/Columns';
import BoardLock from './BoardLock';
import ErrorMessage from '../../ui/ErrorMessage';

export default function Board() {
  const { boardId } = useParams();
  const queryClient = useQueryClient();
  const { data: columns } = useColumns(boardId ?? '');
  const { isLoading, isError, error, refetch } = useLoadBoard();
  const { mutate } = useUpdateBoard();

  const onDragEndMemo = useCallback(function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    if (!source || !destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const columnSource = queryClient.getQueryData<columnCacheType>([
      boardId,
      source.droppableId,
    ]);

    if (!columnSource) return;
    const taskId = columnSource.tasks[source.index];

    if (source.droppableId === destination.droppableId) {
      mutate({
        taskId: taskId,
        newPosition: destination.index + 1,
      });

      const reorderedItems = reorder(
        columnSource.tasks,
        source.index,
        destination.index
      );

      queryClient.setQueriesData([boardId, source.droppableId], {
        ...columnSource,
        tasks: reorderedItems,
      });
    } else {
      mutate({
        taskId: taskId,
        newColumnId: destination.droppableId,
        newPosition: destination.index + 1,
      });

      const columnDest = queryClient.getQueryData<columnCacheType>([
        boardId,
        destination.droppableId,
      ]);

      if (!columnDest) return;

      const result = changeColumn(
        columnSource.tasks,
        columnDest.tasks,
        source,
        destination
      );

      queryClient.setQueriesData<columnCacheType>(
        [boardId, source.droppableId],
        (oldData) => {
          if (!oldData) return;
          return { ...oldData, tasks: result[source.droppableId] };
        }
      );

      queryClient.setQueriesData([boardId, destination.droppableId], {
        ...columnDest,
        tasks: result[destination.droppableId],
      });
    }
  }, []);

  if (!boardId) return null;
  if (isError) {
    return (
      <ErrorMessage
        center={true}
        message={(error as Error).message}
        refresh={refetch}
      />
    );
  }
  if (isLoading) return <Spinner />;

  return (
    <DragDropContext onDragEnd={onDragEndMemo}>
      <BoardLock>
        <StyledBoard>
          {columns ? <Columns columns={columns} /> : null}
          <NewColumn />
        </StyledBoard>
      </BoardLock>
    </DragDropContext>
  );
}
