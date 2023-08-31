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

export { reorder };
