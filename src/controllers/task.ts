import prisma from '../db';

export async function createTask(req, res) {
  const { user } = req;
  const boardId = req.body.boardId;

  const userBoards = await prisma.board.findMany({
    where: {
      belongsToId: user.id,
    },
  });

  const belongsToUser = userBoards.findIndex((board) => board.id === boardId);

  if (belongsToUser === -1) {
    res.status(401);
    res.json({ message: 'You cannnot access this resource' });
    return;
  }

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

export async function markSubtask(req, res) {
  const { user } = req;
  const boardId = req.body.boardId;

  const userBoards = await prisma.board.findMany({
    where: {
      belongsToId: user.id,
    },
  });

  const belongsToUser = userBoards.findIndex((board) => board.id === boardId);

  if (belongsToUser === -1) {
    res.status(401);
    res.json({ message: 'You cannnot access this resource' });
    return;
  }

  const subTask = await prisma.subTask.update({
    where: {
      id: req.body.subTaskId,
    },
    data: {
      completed: req.body.completed,
    },
  });

  res.status(200);
  res.json({ subTask });
}
