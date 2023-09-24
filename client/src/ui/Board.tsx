import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useUpdateBoard } from '../hooks/useUpdateBoard';
import { changeColumn, reorder } from '../utils/cacheOperations';

import StyledBoard from './BoardStyled';
import Column from './Column';
import Task from './Task';
import Modal from './Modal';
import TaskDetails from './TaskDetails';
import EditTask from './EditTask';
import Spinner from './Spinner';
import useLoadBoard from '../hooks/useLoadBoard';
import BoardLock from './BoardLock';
import { useGlobalUI } from '../utils/GlobalUI';
import { columnType, taskType } from '../types/types';
import NewColumn from './NewColumn';

export default function Board() {
  const { boardLocked } = useGlobalUI();
  const { boardId } = useParams();
  const { isUpdatingPosition, mutate } = useUpdateBoard(boardId);
  const queryClient = useQueryClient();
  const [currTask, setCurrTask] = useState<null | string>(null);
  const [cache, setCache] = useState<columnType[]>([]);

  const { isLoading, isError, data, error } = useLoadBoard(boardId, setCache);

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

    const taskId = data.board.columns.find((column: columnType) => {
      return column.id === source.droppableId;
    }).tasks[source.index].id;

    if (source.droppableId === destination.droppableId) {
      mutate({
        taskId: taskId,
        newPosition: destination.index + 1,
      });

      const index = cache.findIndex((cl) => cl.id === source.droppableId);

      const reorderedItems = reorder(
        cache[index].tasks,
        source.index,
        destination.index
      );

      const newCache: columnType[] = [...cache];
      newCache[index].tasks = reorderedItems;
      setCache(newCache);
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

    setCache(data.board.columns);
  }, [boardId]);

  const onSelectTask = (task: taskType) => {
    setCurrTask(task.id);
    queryClient.setQueryData(['currTask'], () => ({ task }));
  };

  if (!boardId) return null;

  if (isLoading) return <Spinner />;

  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardLock isLocked={boardLocked}>
          <StyledBoard id="board">
            {cache.map((column) => {
              return (
                <Droppable droppableId={column.id} key={column.id}>
                  {(provided, snapshot) => (
                    <Column
                      title={column.name}
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      <ul ref={provided.innerRef} {...provided.droppableProps}>
                        {column.tasks.map((task, idx) => (
                          <Draggable
                            isDragDisabled={boardLocked}
                            draggableId={task.id}
                            key={task.id}
                            index={idx}
                          >
                            {(provided, snapshot) => (
                              <li
                                className="mb-1rem"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Task
                                  task={task}
                                  onSelectTask={onSelectTask}
                                  isDragging={snapshot.isDragging}
                                />
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    </Column>
                  )}
                </Droppable>
              );
            })}
            <NewColumn />
          </StyledBoard>
        </BoardLock>
        {isUpdatingPosition ? <Spinner /> : null}
      </DragDropContext>
      <Modal.Content name="details">
        {currTask && !isUpdatingPosition ? (
          <TaskDetails currTask={currTask} />
        ) : (
          <div>Loading</div>
        )}
      </Modal.Content>
      <Modal.Content name="edit">
        {currTask && !isUpdatingPosition ? (
          <EditTask task={currTask} />
        ) : (
          <div>Loading</div>
        )}
      </Modal.Content>
    </>
  );
}
