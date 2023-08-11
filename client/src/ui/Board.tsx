import { useQuery } from '@tanstack/react-query';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';

import { taskType } from '../types/types';
import { useCallback, useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import AddNewTask from './AddNewTask';
import TaskDetails from './TaskDetails';

const todo = [
  { task: 'Build UI onboarding' },
  { task: 'Build UI for search' },
  { task: 'QA and test all major user' },
  { task: 'Design settings and search' },
];

const doing = [
  { task: 'Updating the UI buttons' },
  { task: 'Design the API' },
  { task: 'Create a custom hook' },
  { task: 'Deployment' },
];

export default function Board() {
  const [currentTask, setCurrentTask] = useState('');
  // const { data, isFetching } = useQuery({
  //   queryKey: ['tasks'],
  //   queryFn: async () => {
  //     const res = await fetch('http://localhost:9000/boards');
  //     const data = await res.json();

  //     return data;
  //   },
  // });
  const [tasks, setTasks] = useState({ todo: todo, doing: doing });

  // const { columns } = data ?? data.at(0);

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;

      if (!source || !destination) return;

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        const items = Array.from(tasks[source.droppableId]);
        const [reordedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reordedItem);

        setTasks((s) => ({ ...s, [source.droppableId]: items }));
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
    },
    [tasks]
  );

  // if (isFetching) return <p>Loading...</p>;

  // return (
  //   <DragDropContext onDragEnd={onDragEnd}>
  //     <Droppable droppableId="Test-Column">
  //       {(provided) => (
  //         <ul
  //           style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
  //           ref={provided.innerRef}
  //           {...provided.droppableProps}
  //         >
  //           {tasks.map((t, index: number) => (
  //             <Draggable
  //               draggableId={t.task.split(' ').join('-')}
  //               key={t.task.split(' ').join('-')}
  //               index={index}
  //             >
  //               {(provided) => (
  //                 <div
  //                   ref={provided.innerRef}
  //                   {...provided.draggableProps}
  //                   {...provided.dragHandleProps}
  //                   style={{ padding: '1rem 2rem', backgroundColor: 'red' }}
  //                 >
  //                   <h4>{t.task}</h4>
  //                   <p>0 of 5 subtasks</p>
  //                 </div>
  //               )}
  //             </Draggable>
  //           ))}
  //           {provided.placeholder}
  //         </ul>
  //       )}
  //     </Droppable>
  //   </DragDropContext>
  // );

  return (
    <Modal>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', gap: '5rem' }}>
          <Droppable droppableId="todo">
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                {tasks['todo'].map((t, index: number) => (
                  <Draggable
                    draggableId={t.task.split(' ').join('-')}
                    key={t.task.split(' ').join('-')}
                    index={index}
                  >
                    {(provided) => (
                      <Modal.Trigger
                        fn={() => setCurrentTask(tasks.todo[index].task)}
                      >
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <h4>{t.task}</h4>
                          <p>0 of 5 subtasks</p>
                        </li>
                      </Modal.Trigger>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <Droppable droppableId="doing">
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                {tasks['doing'].map((t, index: number) => (
                  <Draggable
                    draggableId={t.task.split(' ').join('-')}
                    key={t.task.split(' ').join('-')}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h4>{t.task}</h4>
                        <p>0 of 5 subtasks</p>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <Modal.Content>
        {currentTask ? <TaskDetails task={currentTask} /> : <div>Loading</div>}
      </Modal.Content>
    </Modal>
  );

  // return (
  //   <DragDropContext onDragEnd={onDragEnd}>
  //     <div style={{ display: 'flex', gap: '5rem' }}>
  //       {columns.map((column) => (
  //         <Droppable droppableId={column.column} key={column.column}>
  //           {(provided) => (
  //             <ul ref={provided.innerRef} {...provided.droppableProps}>
  //               {column.tasks.map((t, index: number) => (
  //                 <Draggable
  //                   draggableId={t.task.split(' ').join('-')}
  //                   key={t.task.split(' ').join('-')}
  //                   index={index}
  //                 >
  //                   {(provided) => (
  //                     <li
  //                       onClick={() => console.log('Clicked')}
  //                       ref={provided.innerRef}
  //                       {...provided.draggableProps}
  //                       {...provided.dragHandleProps}
  //                     >
  //                       <h4>{t.task}</h4>
  //                       <p>0 of 5 subtasks</p>
  //                     </li>
  //                   )}
  //                 </Draggable>
  //               ))}
  //               {provided.placeholder}
  //             </ul>
  //           )}
  //         </Droppable>
  //       ))}
  //     </div>
  //   </DragDropContext>
  // );
}
