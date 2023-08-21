export class NotFoundError extends Error {
  name: string;
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export class BadRequestError extends Error {
  name: string;
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

export class UnauthorizedError extends Error {
  name: string;
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

export class ForbiddenError extends Error {
  name: string;
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

export function errorHandlerMiddleware(err, req, res, next) {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong, try again latter';

  res.status(statusCode);
  res.json({ message });
}
