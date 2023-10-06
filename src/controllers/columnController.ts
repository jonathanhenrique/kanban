import prisma from '../db';

export async function createColumn(req, res, next) {
  try {
    const newColumn = await prisma.column.create({
      data: {
        name: req.body.name,
        boardId: req.body.boardId,
      },
    });

    res.status(200);
    res.json(newColumn);
  } catch (error) {
    next(error);
  }
}

export async function getColumn(req, res, next) {
  try {
    const column = await prisma.column.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
        tasks: {
          orderBy: {
            order: 'asc',
          },
          select: {
            title: true,
            id: true,
            order: true,
          },
        },
      },
    });

    res.status(200);
    res.json({ column });
  } catch (error) {
    next(error);
  }
}

export async function updateColumn(req, res, next) {
  try {
    await prisma.column.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
      },
    });

    res.status(200);
    res.json({ message: 'column updated' });
  } catch (error) {
    next(error);
  }
}

export async function deleteColumn(req, res, next) {
  try {
    await prisma.column.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200);
    res.json({ message: 'column deleted' });
  } catch (error) {
    next(error);
  }
}
