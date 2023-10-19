import prisma from '../db';

export async function toggleCompleted(req, res, next) {
  try {
    const subTask = await prisma.subTask.update({
      where: {
        id: req.params.id,
      },
      data: {
        completed: req.body.completed,
      },
    });

    res.status(200);
    res.json({ subTask });
  } catch (error) {
    next(error);
  }
}
