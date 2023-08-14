import prisma from '../db';

export async function getAllBoards(req, res) {
  const { user } = req;

  const boards = await prisma.board.findMany({
    where: {
      belongsToId: user.id,
    },
  });

  res.status(200);
  res.json({ boards });
}

export async function getBoard(req, res) {
  const { id: paramId } = req.params;

  const board = await prisma.board.findUnique({
    where: {
      id: paramId,
    },
  });

  res.status(200);
  res.json({ board });
}

export async function createBoard(req, res) {
  const { user } = req;

  const newBoard = await prisma.board.create({
    data: {
      name: req.body.name,
      belongsToId: user.id,
    },
  });

  res.status(200);
  res.json({ newBoard });
}

export async function updateBoard(req, res) {
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

export async function deleteBoard(req, res) {
  const { id } = req.params;
  res.status(200);
  res.json({ message: `Delete the ${id} Board` });
}
