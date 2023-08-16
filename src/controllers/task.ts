import prisma from '../db';

export async function createTask(req, res) {
  const { user } = req;
  // const boardId = req.body.boardId;

  // const userBoards = await prisma.board.findMany({
  //   where: {
  //     belongsToId: user.id,
  //   },
  // });

  // const belongsToUser = userBoards.findIndex((board) => board.id === boardId);

  // if (belongsToUser === -1) {
  //   res.status(401);
  //   res.json({ message: 'You cannnot access this resource' });
  //   return;
  // }

  const subTasks = req.body.subTasks.map((st: string) => {
    return { description: st };
  });

  const task = await prisma.task.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      order: req.body.order,
      columnId: req.body.columnId,
      subTasks: {
        create: subTasks,
      },
    },
    include: {
      subTasks: true,
    },
  });

  res.status(200);
  res.json({ task });
}

export async function updateTask(req, res) {
  const { id: paramId } = req.params;

  const task = await prisma.task.update({
    where: {
      id: paramId,
    },
    data: req.body,
  });

  res.status(200);
  res.json({ task });
}

export async function deleteTask(req, res) {
  const { id: paramId } = req.params;

  const task = await prisma.task.delete({
    where: {
      id: paramId,
    },
  });

  res.status(200);
  res.json({ task });
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
