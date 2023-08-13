import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export async function createNewUser(req, res) {
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
}

export async function signIn(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: 'nope' });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
}
