import { body, param, validationResult } from 'express-validator';
import { BadRequestError } from './errors';
import prisma from '../db';

const UUID_PATTERN =
  /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

function validateUUID(id) {
  return UUID_PATTERN.test(id);
}

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

export const validateBoardInput = [
  [
    body('name')
      .notEmpty()
      .withMessage('board name is required')
      .isLength({ min: 3, max: 30 })
      .withMessage('board name length must between 3 and 30'),
  ],
  validationHandler,
];

export const validateIdParam = [
  [param('id').custom(validateUUID).withMessage('Invalid UUID')],
  validationHandler,
];

export const validateRegisterInput = [
  [
    body('name')
      .notEmpty()
      .withMessage('name is required')
      .isLength({ min: 3, max: 50 })
      .withMessage('name length must be between 3 and 50'),
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('email address is not valid')
      .custom(async (value) => {
        const emailRegistered = await prisma.user.findFirst({
          where: {
            email: value,
          },
        });
        if (emailRegistered) {
          throw new Error('email already registered');
        }
      }),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password must be at least 8 characters'),
  ],
  validationHandler,
];

export const validateLoginInput = [
  [
    body('email')
      .notEmpty()
      .withMessage('user email is required')
      .isEmail()
      .withMessage('email address is not valid'),
    body('password').notEmpty().withMessage('password is required'),
  ],
  validationHandler,
];
