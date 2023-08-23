import prisma from '../db';

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
          include: {
            tasks: {
              orderBy: {
                order: 'asc',
              },
              include: {
                subTasks: true,
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
    await prisma.board.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });

    res.status(201);
    res.json({ message: 'board created' });
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
    await prisma.board.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200);
    res.json({ message: 'board deleted' });
  } catch (error) {
    next(error);
  }
}
