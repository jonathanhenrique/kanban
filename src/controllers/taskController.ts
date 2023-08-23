import prisma from '../db';

export async function createTask(req, res, next) {
  const { subTasks } = req.body;
  let subTasksData = [];

  if (subTasks && subTasks.length > 0) {
    subTasksData = subTasks.map((st: string) => {
      return { description: st };
    });
  }

  try {
    await prisma.task.create({
      data: {
        title: req.body.title,
        description: req.body.description ?? '',
        order: req.body.order,
        columnId: req.body.columnId,
        subTasks: {
          create: subTasksData,
        },
      },
      include: {
        subTasks: true,
      },
    });

    res.status(200);
    res.json({ message: 'task created' });
  } catch (error) {
    next(error);
  }
}

export async function updateTask(req, res, next) {
  try {
    const task = await prisma.task.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    res.status(200);
    res.json({ task });
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const { id: paramId } = req.params;

    const task = await prisma.task.delete({
      where: {
        id: paramId,
      },
    });

    res.status(200);
    res.json({ task });
  } catch (error) {
    next(error);
  }
}

export async function changeOrder(req, res, next) {
  try {
    const { newPosition } = req.body;
    const selectedTask = req.task;

    let column;

    if (selectedTask.order < newPosition) {
      column = await prisma.column.update({
        where: {
          id: selectedTask.column.id,
        },
        data: {
          tasks: {
            updateMany: {
              where: {
                order: {
                  gt: selectedTask.order,
                  lte: newPosition,
                },
              },
              data: {
                order: {
                  decrement: 1,
                },
              },
            },
          },
        },
        include: {
          tasks: true,
        },
      });
    } else if (selectedTask.order > newPosition) {
      column = await prisma.column.update({
        where: {
          id: selectedTask.column.id,
        },
        data: {
          tasks: {
            updateMany: {
              where: {
                order: {
                  lt: selectedTask.order,
                  gte: newPosition,
                },
              },
              data: {
                order: {
                  increment: 1,
                },
              },
            },
          },
        },
        include: {
          tasks: true,
        },
      });
    }

    await prisma.task.update({
      where: {
        id: selectedTask.id,
      },
      data: {
        order: newPosition,
      },
    });

    res.status(200);
    res.json({ column });
  } catch (error) {
    next(error);
  }
}

export async function changeOrderColumn(req, res, next) {
  try {
    const { newPosition, newColumnId } = req.body;
    const selectedTask = req.task;

    await prisma.column.update({
      where: {
        id: newColumnId,
      },
      data: {
        tasks: {
          updateMany: {
            where: {
              order: {
                gte: newPosition,
              },
            },
            data: {
              order: {
                increment: 1,
              },
            },
          },
        },
      },
      include: {
        tasks: true,
      },
    });

    await prisma.column.update({
      where: {
        id: selectedTask.column.id,
      },
      data: {
        tasks: {
          updateMany: {
            where: {
              order: {
                gt: selectedTask.order,
              },
            },
            data: {
              order: {
                decrement: 1,
              },
            },
          },
        },
      },
      include: {
        tasks: true,
      },
    });

    const task = await prisma.task.update({
      where: {
        id: selectedTask.id,
      },
      data: {
        columnId: newColumnId,
        order: newPosition,
      },
    });

    res.status(200);
    res.json({ task });
  } catch (error) {
    next(error);
  }
}

export async function changeColumn(req, res) {
  const { taskId, currColumn, newColumn } = req.body;

  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      columnId: newColumn,
    },
  });

  res.status(200);
  res.json({ task });
}
