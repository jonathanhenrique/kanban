import prisma from '../db';

export async function createColumn(req, res) {
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

  const column = await prisma.column.create({
    data: {
      name: req.body.name,
      boardId: boardId,
    },
  });

  res.status(200);
  res.json({ column });
}

export async function updateColumn(req, res) {
  const { id: paramId } = req.params;

  const board = await prisma.board.update({
    where: {
      id: paramId,
    },
    data: {
      name: req.body.name,
    },
  });

  res.status(200);
  res.json({ board });
}

export async function deleteColumn(req, res) {
  const { id } = req.params;
  res.status(200);
  res.json({ message: `Delete the ${id} Board` });
}
