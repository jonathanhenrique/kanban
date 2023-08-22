import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors';

export function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hash(password, salt);
}

export function comparePasswords(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export function createJWT(user) {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: `${process.env.JWT_EXPIRES_IN}d` }
  );

  return token;
}

export function protectedRoute(req, res, next) {
  const { token } = req.cookies;

  if (!token) throw new UnauthorizedError('invalid authentication credentials');

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    throw new UnauthorizedError('invalid authentication credentials');
  }
}
