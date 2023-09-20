const reorder2 = (list, sourceIndex, destinationIndex) => {
  const result = Array.from(list.tasks).map((task) => {
    let newOrder = task.order;

    if (sourceIndex < destinationIndex) {
      if (task.order > sourceIndex && task.order <= destinationIndex) {
        newOrder = task.order - 1;
      }
    } else {
      if (task.order < sourceIndex && task.order >= destinationIndex) {
        newOrder = task.order + 1;
      }
    }

    if (list.tasks[sourceIndex - 1].id === task.id) newOrder = destinationIndex;

    return { ...task, order: newOrder };
  });

  list.tasks = result.sort((a, b) => a.order - b.order);
  return list;
};

const reorderColumns = (
  selectedTask,
  sourceColumn,
  destinationColumn,
  sourceIndex,
  destinationIndex
) => {
  selectedTask.order = destinationIndex;

  const oriColumn = Array.from(sourceColumn.tasks)
    .filter((task) => task.order !== sourceIndex)
    .map((task) => {
      const { order } = task;

      return {
        ...task,
        order: order > sourceIndex ? order - 1 : order,
      };
    });

  const desColumn = Array.from(destinationColumn.tasks).map((task) => {
    const { order } = task;

    return {
      ...task,
      order: order >= destinationIndex ? order + 1 : order,
    };
  });

  desColumn.push({
    ...selectedTask,
    columnId: destinationColumn.id,
    order: destinationIndex,
  });

  desColumn.sort((a, b) => a.order - b.order);

  return [oriColumn, desColumn];
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  // console.log(result);
  return result;
};

const changeColumn = (
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export { reorder, changeColumn };
