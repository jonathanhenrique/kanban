import prisma from '../db';

export async function createColumn(req, res) {
  const boardId = req.body.boardId;

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

  const column = await prisma.column.update({
    where: {
      id: paramId,
    },
    data: {
      name: req.body.name,
    },
  });

  res.status(200);
  res.json({ column });
}

export async function deleteColumn(req, res) {
  const { id: paramId } = req.params;

  const column = await prisma.column.delete({
    where: {
      id: paramId,
    },
  });

  res.status(200);
  res.json({ column });
}

export async function getColumn(req, res) {
  const { id: paramId } = req.params;

  const column = await prisma.column.findUnique({
    where: {
      id: paramId,
    },
    include: {
      tasks: {
        orderBy: {
          order: 'asc',
        },
        select: {
          title: true,
        },
      },
    },
  });

  res.status(200);
  res.json({ column });
}
