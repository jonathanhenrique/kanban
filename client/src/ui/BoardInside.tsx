import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useUpdateBoard } from '../hooks/useUpdateBoard';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Column from './Column';

import Task from './Task';
import Modal from './Modal';
import TaskDetails from './TaskDetails';
import Button from './Button';
import {
  HiMiniTrash,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineTrash,
  HiOutlineWrenchScrewdriver,
  HiPlusCircle,
} from 'react-icons/hi2';
import TaskInfo from './TaskInfo';

const StyledBoard = styled.div`
  display: flex;
  align-items: top;
  gap: 3rem;
  transition: opacity 100ms;
  opacity: ${(props) => (props.isUpdating ? '.5' : '1')};
`;

const Task2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* gap: 1rem; */

  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
  border: 1px solid var(--color-border-dark);
  border-radius: var(--border-radius-lg);

  background-color: var(--color-grey-700);
  background-image: url('noise-bg-soft.png');
  background-position: 0 0;
  background-size: 200px 200px;

  background-color: ${(props) =>
    props.isDragging ? 'var(--color-grey-500)' : 'var(--color-grey-700)'};
`;

const ButtonsGroup = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const reorder = (list, sourceIndex, destinationIndex) => {
  const result = Array.from(list.tasks).map((task) => {
    let newOrder = task.order;

    if (sourceIndex < destinationIndex) {
      if (task.order > sourceIndex && task.order <= destinationIndex) {
        newOrder = task.order - 1;
        console.log(`condition 1: newOrder ${newOrder}`);
      }
    } else {
      if (task.order < sourceIndex && task.order >= destinationIndex) {
        newOrder = task.order + 1;
        console.log('condition 2');
      }
    }

    if (list.tasks[sourceIndex - 1].id === task.id) newOrder = destinationIndex;

    return { ...task, order: newOrder };
  });

  list.tasks = result.sort((a, b) => a.order - b.order);
  return list;
};

export default function BoardInside({ board }) {
  const { isUpdatingPosition, mutate } = useUpdateBoard();
  const [currentTask, setCurrentTask] = useState(null);
  const [modalType, setModalType] = useState('');
  const [cache, setCache] = useState([]);
  // const queryClient = useQueryClient();
  // const { board } = queryClient.getQueryData(['currBoard']);

  useEffect(function () {
    setCache(board.columns);
  }, []);

  // console.log(cache);

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

      // const taskId = data.board.columns
      //   .find((column) => column.id === source.droppableId)
      //   .tasks.find((task) => task.order === source.index).id;

      // mutate({
      //   taskId: taskId,
      //   newPosition: destination.index,
      // });
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
    <Modal>
      <DragDropContext onDragEnd={onDragEnd}>
        <StyledBoard isUpdating={isUpdatingPosition}>
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
                            // <Modal.Trigger fn={() => setCurrentTask(task)}>
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Task2 isDragging={snapshot.isDragging}>
                                <div>
                                  <h4>{task.title}</h4>
                                  <p>{`${task.subTasks.reduce(
                                    (acc, st) => acc + st.completed,
                                    0
                                  )} subtasks completed`}</p>
                                </div>
                                <ButtonsGroup>
                                  <Button
                                    variation="task"
                                    icon={<HiOutlineArrowTopRightOnSquare />}
                                  >
                                    Open
                                  </Button>

                                  <Button
                                    variation="task"
                                    icon={<HiOutlineWrenchScrewdriver />}
                                  >
                                    Edit
                                  </Button>

                                  <Button
                                    variation="task"
                                    icon={<HiOutlineTrash />}
                                  >
                                    Delete
                                  </Button>
                                </ButtonsGroup>
                              </Task2>
                            </li>
                            // </Modal.Trigger>
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
      <Modal.Content>
        {currentTask && !isUpdatingPosition ? (
          <TaskDetails task={currentTask} />
        ) : (
          <div>Loading</div>
        )}
      </Modal.Content>
    </Modal>
  );
  // return (
  //   <Modal>
  //     <DragDropContext onDragEnd={onDragEnd}>
  //       <StyledBoard isUpdating={isUpdatingPosition}>
  //         {cache.map((column) => {
  //           return (
  //             <Droppable droppableId={column.id} key={column.id}>
  //               {(provided, snapshot) => (
  //                 <Column
  //                   title={column.name}
  //                   isDraggingOver={snapshot.isDraggingOver}
  //                 >
  //                   <ul ref={provided.innerRef} {...provided.droppableProps}>
  //                     {column.tasks.map((task) => (
  //                       <Draggable
  //                         isDragDisabled={isUpdatingPosition}
  //                         draggableId={task.id}
  //                         key={task.id}
  //                         index={task.order}
  //                       >
  //                         {(provided, snapshot) => (
  //                           // <Modal.Trigger fn={() => setCurrentTask(task)}>
  //                           <li
  //                             ref={provided.innerRef}
  //                             {...provided.draggableProps}
  //                             {...provided.dragHandleProps}
  //                           >
  //                             <Task isDragging={snapshot.isDragging}>
  //                               {/* <TaskInfo task={task} /> */}
  //                               <div>
  //                                 <h4>{task.title}</h4>
  //                                 <p>{`${task.subTasks.reduce(
  //                                   (acc, st) => acc + st.completed,
  //                                   0
  //                                 )} subtasks completed`}</p>
  //                               </div>
  //                               <ButtonsGroup>
  //                                 <Modal.Trigger
  //                                   contentToOpen="taskDetails"
  //                                   fn={() => setCurrentTask(task)}
  //                                 >
  //                                   <Button
  //                                     variation="task"
  //                                     icon={<HiOutlineArrowTopRightOnSquare />}
  //                                   >
  //                                     Open
  //                                   </Button>
  //                                 </Modal.Trigger>
  //                                 <Modal.Trigger
  //                                   fn={() => setCurrentTask(task)}
  //                                 >
  //                                   <Button
  //                                     variation="task"
  //                                     icon={<HiOutlineWrenchScrewdriver />}
  //                                   >
  //                                     Edit
  //                                   </Button>
  //                                 </Modal.Trigger>
  //                                 <Button
  //                                   variation="task"
  //                                   icon={<HiOutlineTrash />}
  //                                 >
  //                                   Delete
  //                                 </Button>
  //                               </ButtonsGroup>
  //                             </Task>
  //                           </li>
  //                           // </Modal.Trigger>
  //                         )}
  //                       </Draggable>
  //                     ))}
  //                     {provided.placeholder}
  //                   </ul>
  //                 </Column>
  //               )}
  //             </Droppable>
  //           );
  //         })}
  //       </StyledBoard>
  //     </DragDropContext>
  //     <Modal.Content>
  //       {currentTask && !isUpdatingPosition ? (
  //         <TaskDetails task={currentTask} />
  //       ) : (
  //         <div>Loading</div>
  //       )}
  //     </Modal.Content>
  //   </Modal>
  // );
}
