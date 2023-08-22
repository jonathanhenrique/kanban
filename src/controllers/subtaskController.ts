import prisma from '../db';

export async function toggleCompleted(req, res) {
  const { id: paramId } = req.params;

  const subTask = await prisma.subTask.update({
    where: {
      id: paramId,
    },
    data: {
      completed: req.body.completed,
    },
  });

  res.status(200);
  res.json({ subTask });
}
