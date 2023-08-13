import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export function comparePasswords(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export function hashPassword(password) {
  return bcrypt.hash(password, 5);
}

export function createJWT(user) {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET
  );

  return token;
}

export function protectRoute(req, res, next) {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: 'Not authorized' });
    return;
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    res.status(401);
    res.json({ message: 'Not valid token' });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    res.json({ message: 'Not valid token' });
    return;
  }
}
