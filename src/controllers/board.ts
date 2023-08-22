import prisma from '../db';
import { ForbiddenError, NotFoundError } from '../modules/errors';

export async function getAllBoards(req, res, next) {
  try {
    const boards = await prisma.board.findMany({
      where: {
        belongsToId: req.user.id,
      },
    });

    res.status(200);
    res.json({ boards });
  } catch (error) {
    next(new Error());
  }
}

export async function getBoard(req, res, next) {
  try {
    const board = await prisma.board.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        columns: {
          include: {
            tasks: {
              include: {
                subTasks: true,
              },
            },
          },
        },
      },
    });

    if (!board) {
      throw new NotFoundError('board not found');
    }

    if (board.belongsToId !== req.user.id) {
      throw new ForbiddenError('not allowed to access');
    }

    res.status(200);
    res.json({ board });
  } catch (error) {
    next(error.statusCode ? error : new Error());
  }
}

export async function createBoard(req, res, next) {
  try {
    const newBoard = await prisma.board.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });

    res.status(200);
    res.json({ newBoard });
  } catch (error) {
    next(new Error());
  }
}

export async function updateBoard(req, res, next) {
  try {
    const board = await prisma.board.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
      },
    });

    res.status(200);
    res.json({ board });
  } catch (error) {
    next(new Error());
  }
}

export async function deleteBoard(req, res) {
  const { id: paramId } = req.params;

  const board = await prisma.board.delete({
    where: {
      id: paramId,
    },
  });

  res.status(200);
  res.json({ board });
}
