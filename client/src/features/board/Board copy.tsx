import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUpdateBoard } from './useUpdateBoard';
import { changeColumn, reorder } from '../../utils/cacheOperations';
import StyledBoard from '../../ui/StyledBoard';
import Column from '../column/Column';
import Spinner from '../../ui/Spinner';
import useLoadBoard from './useLoadBoard';
import useLoadBoard2 from './useLoadBoard2';
import { useGlobalUI } from '../../utils/GlobalUI';
import { columnType, taskType } from '../../types/types';
import NewColumn from '../column/NewColumn';
import { useCacheContext } from './BoardCacheContext';

export default function Board() {
  const { boardLocked } = useGlobalUI();
  const { boardId } = useParams();
  const { isUpdatingPosition, mutate } = useUpdateBoard(boardId);
  const queryClient = useQueryClient();
  const [currTask, setCurrTask] = useState<null | string>(null);
  const { cache, setCache } = useCacheContext();

  // const { isLoading, isError, data, error } = useLoadBoard(boardId, setCache);
  const { isLoading, isError, data, error } = useLoadBoard2(boardId, setCache);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // Check if a change really occurs, case not will return without changes
    if (!source || !destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // const taskId = data.board.columns.find((column: columnType) => {
    //   return column.id === source.droppableId;
    // }).tasks[source.index].id;

    if (source.droppableId === destination.droppableId) {
      const column = queryClient.getQueryData(['column', source.droppableId]);

      const taskId = column.tasks[source.index];

      mutate({
        taskId: taskId,
        newPosition: destination.index + 1,
      });

      const reorderedItems = reorder(
        column.tasks,
        source.index,
        destination.index
      );

      queryClient.setQueriesData(['column', source.droppableId], (oldData) => {
        return { ...oldData, tasks: reorderedItems };
      });

      // const index = cache.findIndex((cl) => cl.id === source.droppableId);

      // const reorderedItems = reorder(
      //   cache[index].tasks,
      //   source.index,
      //   destination.index
      // );

      // const newCache: columnType[] = [...cache];
      // newCache[index].tasks = reorderedItems;
      // setCache(newCache);
    } else {
      mutate({
        taskId: taskId,
        newColumnId: destination.droppableId,
        newPosition: destination.index + 1,
      });

      const idxOrigin = cache.findIndex((cl) => cl.id === source.droppableId);
      const idxDes = cache.findIndex((cl) => cl.id === destination.droppableId);

      const result = changeColumn(
        cache[idxOrigin].tasks,
        cache[idxDes].tasks,
        source,
        destination
      );

      const newCache = [...cache];
      newCache[idxOrigin].tasks = result[source.droppableId];
      newCache[idxDes].tasks = result[destination.droppableId];
      setCache(newCache);
    }
  }

  useEffect(() => {
    if (!data) return;

    setCache(data);
  }, [boardId]);

  const onSelectTask = (task: taskType) => {
    setCurrTask(task.id);
    queryClient.setQueryData(['currTask'], () => ({ task }));
  };

  if (!boardId) return null;

  if (isLoading) return <Spinner />;

  if (isError) return <p>{(error as Error).message}</p>;

  // console.log(data);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledBoard>
        {cache.map((column) => {
          return (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided, snapshot) => (
                <Column
                  provided={provided}
                  columnId={column.id}
                  isDraggingOver={snapshot.isDraggingOver}
                />
              )}
            </Droppable>
          );
        })}
        <NewColumn />
      </StyledBoard>
      {isUpdatingPosition ? <Spinner /> : null}
    </DragDropContext>
  );
}
