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
    const expireTime = +process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000;

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + expireTime),
      secure: process.env.ENVIRONMENT === 'production',
    });
    res.status(200);
    res.json({ message: 'user logged in' });
  } catch (error) {
    next(error.statusCode ? error : new Error());
  }
}
