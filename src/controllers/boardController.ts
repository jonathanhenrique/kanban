import prisma from '../db';

export async function getAllBoards(req, res, next) {
  try {
    const boards = await prisma.board.findMany({
      where: {
        belongsToId: req.user.id,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200);
    res.json({ boards });
  } catch (error) {
    next(error);
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
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            tasks: {
              orderBy: {
                order: 'asc',
              },
              include: {
                subTasks: {
                  orderBy: {
                    order: 'asc',
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(200);
    res.json({ board });
  } catch (error) {
    next(error);
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
    res.json({ id: newBoard.id });
  } catch (error) {
    next(error);
  }
}

export async function updateBoard(req, res, next) {
  try {
    await prisma.board.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
      },
    });

    res.status(200);
    res.json({ message: 'board updated' });
  } catch (error) {
    next(error);
  }
}

export async function deleteBoard(req, res, next) {
  try {
    const deletedBoard = await prisma.board.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200);
    res.json({ id: deletedBoard.id });
  } catch (error) {
    next(error);
  }
}
