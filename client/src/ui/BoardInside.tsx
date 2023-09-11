import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';

import { useUpdateBoard } from '../hooks/useUpdateBoard';
import { reorder } from '../utils/cacheOperations';
import StyledBoard from './BoardStyled';
import Column from './Column';
import Task from './Task';
import Modal from './Modal';
import TaskDetails from './TaskDetails';
import EditTask from './EditTask';
import { useQuery } from '@tanstack/react-query';
import Spinner from './Spinner';

export default function BoardInside() {
  const { isUpdatingPosition, mutate } = useUpdateBoard();
  const [currentTask, setCurrentTask] = useState(null);
  const [cache, setCache] = useState([]);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['currBoard'],
    queryFn: async () => {
      const res = await fetch(
        '/api/boards/cc529ae3-d1d2-4297-8eed-74b9c8e71070'
      );
      const data = await res.json();

      return data;
    },
    onSuccess(data) {
      setCache(data.board.columns);
    },
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!source || !destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const taskId = data.board.columns
      .find((column) => column.id === source.droppableId)
      .tasks.find((task) => task.order === source.index).id;

    mutate({
      taskId: taskId,
      newPosition: destination.index,
    });

    if (source.droppableId === destination.droppableId) {
      const index = cache.findIndex(
        (column) => column.id === source.droppableId
      );
      const reorderedItems = reorder(
        cache[index],
        source.index,
        destination.index
      );

      const newCache = [...cache];
      newCache[index] = reorderedItems;
      setCache(newCache);
    } else {
      const itemsSource = Array.from(tasks[source.droppableId]);
      const itemsDestination = Array.from(tasks[destination.droppableId]);
      const [reordedItem] = itemsSource.splice(source.index, 1);
      itemsDestination.splice(destination.index, 0, reordedItem);

      setTasks((s) => {
        return {
          ...s,
          [source.droppableId]: itemsSource,
          [destination.droppableId]: itemsDestination,
        };
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (!cache) return null;

  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            opacity: isUpdatingPosition ? 0.5 : 1,
            pointerEvents: isUpdatingPosition ? 'none' : 'auto',
            transition: '100ms linear',
            filter: isUpdatingPosition ? 'blur(1px)' : '',
          }}
        >
          <StyledBoard>
            {cache.map((column) => {
              return (
                <Droppable droppableId={column.id} key={column.id}>
                  {(provided, snapshot) => (
                    <Column
                      title={column.name}
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      <ul ref={provided.innerRef} {...provided.droppableProps}>
                        {column.tasks.map((task) => (
                          <Draggable
                            isDragDisabled={isUpdatingPosition}
                            draggableId={task.id}
                            key={task.id}
                            index={task.order}
                          >
                            {(provided, snapshot) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Task
                                  task={task}
                                  setCurrentTask={setCurrentTask}
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
          </StyledBoard>
        </div>
        {isUpdatingPosition ? <Spinner /> : null}
      </DragDropContext>
      <Modal.Content name="details">
        {currentTask && !isUpdatingPosition ? (
          <TaskDetails task={currentTask} />
        ) : (
          <div>Loading</div>
        )}
      </Modal.Content>
      <Modal.Content name="edit">
        {currentTask && !isUpdatingPosition ? (
          <EditTask task={currentTask} />
        ) : (
          <div>Loading</div>
        )}
      </Modal.Content>
    </>
  );
}
