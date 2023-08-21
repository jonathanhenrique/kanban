import { body, param, validationResult } from 'express-validator';
import { BadRequestError } from './errors';

const UUID_PATTERN =
  /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

function validationHandler(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((e) => e.msg)
      .join(', ');

    throw new BadRequestError(errorMessages);
  }
  next();
}

function validateUUDI(id) {
  return UUID_PATTERN.test(id);
}

export const validateBoardInput = [
  [
    body('name')
      .notEmpty()
      .withMessage('name is required')
      .isLength({ min: 3, max: 30 })
      .withMessage('name length must between 3 and 30'),
  ],
  validationHandler,
];

export const validateIdParam = [
  [param('id').custom(validateUUDI).withMessage('Invalid UUID')],
  validationHandler,
];
