import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';
import { UnauthorizedError } from '../modules/errors';

export async function register(req, res, next) {
  try {
    await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password),
      },
    });

    res.status(201);
    res.json({ message: 'User created' });
  } catch (error) {
    next(new Error('error creating the user, try again latter'));
  }
}

export async function login(req, res, next) {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) throw new UnauthorizedError('invalid credentials');

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) throw new UnauthorizedError('invalid credentials');

    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    next(error.statusCode ? error : new Error());
  }
}
