export default function BoardInside() {
  const queryClient = useQueryClient();
  const { isUpdatingPosition, mutate } = useUpdateBoard();
  const [currTask, setCurrTask] = useState(null);
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

    const taskId = data.board.columns.find(
      (column) => column.id === source.droppableId
    ).tasks[source.index].id;

    // mutate({
    //   taskId: taskId,
    //   newPosition: destination.index,
    // });

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

      const newCache = [...cache];
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
  };

  const onSelectTask = (task) => {
    setCurrTask(task.id);
    queryClient.setQueryData(['currTask'], () => ({ task }));
  };

  // console.log(currTask);

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
                        {column.tasks.map((task, idx) => (
                          <Draggable
                            isDragDisabled={isUpdatingPosition}
                            draggableId={task.id}
                            key={task.id}
                            // index={task.order}
                            index={idx}
                          >
                            {(provided, snapshot) => (
                              <li
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
          </StyledBoard>
        </div>
        {isUpdatingPosition ? <Spinner /> : null}
      </DragDropContext>
      <Modal.Content name="details">
        {currTask && !isUpdatingPosition ? (
          <TaskDetails task={currTask} />
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
