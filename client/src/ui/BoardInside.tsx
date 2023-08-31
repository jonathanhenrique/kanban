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

export default function BoardInside({ board }) {
  const { isUpdatingPosition, mutate } = useUpdateBoard();
  const [currentTask, setCurrentTask] = useState(null);
  const [cache, setCache] = useState([]);

  useEffect(function () {
    setCache(board.columns);
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!source || !destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const taskId = board.columns
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

  if (!cache) return null;

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <StyledBoard $isUpdating={isUpdatingPosition}>
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
