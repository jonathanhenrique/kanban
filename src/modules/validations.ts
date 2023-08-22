import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from './errors';
import prisma from '../db';

const UUID_PATTERN =
  /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

const validateUUID = (id) => UUID_PATTERN.test(id);

function inputErrorHandler(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((e) => e.msg);

    throw new BadRequestError(errorMessages.join(', '));
  }
  next();
}

function ownershipErrorHandler(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors.array().at(0).msg;

    switch (errorMessage) {
      case 'invalid ID':
        throw new BadRequestError('invalid ID');
      case 'not found':
        throw new NotFoundError('not found');
      case 'not allowed':
        throw new UnauthorizedError('not allowed');
      default:
        throw new Error();
    }
  }
  next();
}

// Validations for board
export const validateBoardInput = [
  [
    body('name')
      .notEmpty()
      .withMessage('board name is required')
      .isLength({ min: 3, max: 30 })
      .withMessage('board name length must be between 3 and 30'),
  ],
  inputErrorHandler,
];

export const validateBoardOwnership = [
  param('id').custom(async (value, { req }) => {
    const isValidID = validateUUID(value);
    if (!isValidID) throw new BadRequestError('invalid ID');

    const board = await prisma.board.findUnique({
      where: {
        id: value,
      },
    });

    if (!board) {
      throw new NotFoundError('not found');
    }

    if (board.belongsToId !== req.user.id) {
      throw new UnauthorizedError('not allowed');
    }
  }),
  ownershipErrorHandler,
];

// Validations for column
export const validateColumnInput = [
  [
    body('name')
      .notEmpty()
      .withMessage('column name is required')
      .isLength({ min: 3, max: 30 })
      .withMessage('column name length must be between 3 and 30'),
    body('boardId').custom(async (value, { req }) => {
      if (req.method === 'POST') {
        // need the boardID
        if (!value) throw new Error('boardID is required');
        if (!validateUUID(value)) throw new Error('invalid boardID');

        const board = await prisma.board.findUnique({
          where: {
            id: value,
          },
        });

        if (!board) {
          throw new NotFoundError('boardID not found');
        }

        if (board.belongsToId !== req.user.id) {
          throw new UnauthorizedError(
            'not allowed to create a column in this board'
          );
        }
      }
    }),
  ],
  inputErrorHandler,
];

export const validateColumnOwnership = [
  param('id').custom(async (value, { req }) => {
    const isValidID = validateUUID(value);
    if (!isValidID) throw new BadRequestError('invalid ID');

    const column = await prisma.column.findUnique({
      where: {
        id: value,
      },
      include: {
        board: {
          include: {
            belongsTo: true,
          },
        },
      },
    });

    if (!column) {
      throw new NotFoundError('not found');
    }

    if (column.board.belongsTo.id !== req.user.id) {
      throw new UnauthorizedError('not allowed');
    }
  }),
  ownershipErrorHandler,
];

// Validations for register and login
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
  inputErrorHandler,
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
  inputErrorHandler,
];
