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

// Validations for task
export const validateTaskInput = [
  [
    body('title')
      .notEmpty()
      .withMessage('task title is required')
      .isLength({ min: 3, max: 255 })
      .withMessage('task title length must be between 3 and 255'),
    body('description')
      .isLength({ max: 255 })
      .withMessage('task description length must be less than 255')
      .optional(),
    // body('order')
    //   .notEmpty()
    //   .withMessage('task order is required')
    //   .isInt()
    //   .withMessage('task order should be a integer number'),
    body('subTasks').isArray().optional(),
    body('columnId').custom(async (value, { req }) => {
      if (!value) throw new Error('columnID is required');
      if (!validateUUID(value)) throw new Error('invalid columnID');

      const column = await prisma.column.findUnique({
        where: {
          id: value,
        },
        include: {
          board: true,
        },
      });

      if (!column) {
        throw new NotFoundError('columnID not found');
      }

      if (column.board.belongsToId !== req.user.id) {
        throw new UnauthorizedError(
          'not allowed to create a task in this column'
        );
      }
    }),
  ],
  inputErrorHandler,
];

export const validateTaskUpdate = [
  [
    body('title')
      .notEmpty()
      .withMessage('task title is required')
      .isLength({ min: 3, max: 255 })
      .withMessage('task title length must be between 3 and 255')
      .optional(),
    body('description')
      .isLength({ max: 255 })
      .withMessage('task description length must be less than 255')
      .optional(),
  ],
  inputErrorHandler,
];

export const validateTaskOwnership = [
  param('id').custom(async (value, { req }) => {
    const isValidID = validateUUID(value);
    if (!isValidID) throw new BadRequestError('invalid ID');

    const task = await prisma.task.findUnique({
      where: {
        id: value,
      },
      include: {
        column: {
          include: {
            board: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundError('not found');
    }

    if (task.column.board.belongsToId !== req.user.id) {
      throw new UnauthorizedError('not allowed');
    }
  }),
  ownershipErrorHandler,
];

export const validateTaskOrder = [
  body('taskId').custom(async (value, { req }) => {
    if (!value) {
      throw new BadRequestError('taskId is required');
    }

    if (!validateUUID(value)) throw new BadRequestError('invalid ID');

    const task = await prisma.task.findUnique({
      where: {
        id: value,
      },
      select: {
        id: true,
        order: true,
        column: {
          select: {
            id: true,
            board: {
              select: {
                belongsToId: true,
              },
            },
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundError('not found');
    }

    if (task.column.board.belongsToId !== req.user.id) {
      throw new UnauthorizedError('not allowed');
    }

    req.task = task;
  }),
  body('newPosition').custom(async (value, { req }) => {
    if (!req.task) return;

    if (!value) {
      throw new BadRequestError('newPosition is required');
    }

    if (!Number.isFinite(value) || value < 1) {
      throw new BadRequestError('newPosition must be a number greater than 1');
    }

    if (value === req.task.order) {
      throw new BadRequestError('no change detected');
    }

    // const taskRange = await prisma.task.findMany({
    //   where: {
    //     columnId: req.task.columnId,
    //   },
    //   select: {
    //     _count: true,
    //   },
    // });

    // if (value > taskRange) {
    //   throw new NotFoundError(`newPosition must be between 1 and ${taskRange}`);
    // }
  }),
  inputErrorHandler,
];

export const validateTaskOrderColumn = [
  body('taskId').custom(async (value, { req }) => {
    if (!value) {
      throw new BadRequestError('taskId is required');
    }

    if (!validateUUID(value)) throw new BadRequestError('invalid ID');

    const task = await prisma.task.findUnique({
      where: {
        id: value,
      },
      select: {
        id: true,
        order: true,
        column: {
          select: {
            id: true,
            board: {
              select: {
                belongsToId: true,
              },
            },
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundError('not found');
    }

    if (task.column.board.belongsToId !== req.user.id) {
      throw new UnauthorizedError('not allowed');
    }

    req.task = task;
  }),
  body('newPosition').custom(async (value, { req }) => {
    if (!value) {
      throw new BadRequestError('newPosition is required');
    }

    if (!Number.isFinite(value) || value < 1) {
      throw new BadRequestError('newPosition must be a number greater than 1');
    }
  }),
  body('newColumnId').custom(async (value, { req }) => {
    if (!req.task) return;

    if (!value) {
      throw new BadRequestError('newColumnId is required');
    }

    if (!validateUUID(value)) throw new BadRequestError('invalid columnId');

    if (value === req.task.column.id && req.body.order === req.task.order) {
      throw new BadRequestError('no change detected');
    }

    const column = await prisma.column.findUnique({
      where: {
        id: value,
      },
      select: {
        board: {
          select: {
            belongsToId: true,
          },
        },
      },
    });

    if (!column) {
      throw new NotFoundError('column not found');
    }

    if (column.board.belongsToId !== req.user.id) {
      throw new UnauthorizedError('not allowed');
    }
  }),
  inputErrorHandler,
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

// Validations for subtasks
export const validateSubtaskToggle = [
  [
    body('completed')
      .notEmpty()
      .withMessage('task completed is required')
      .isBoolean()
      .withMessage('task completed must be true or false'),
  ],
  inputErrorHandler,
];

export const validateSubtaskOwnership = [
  param('id').custom(async (value, { req }) => {
    const isValidID = validateUUID(value);
    if (!isValidID) throw new BadRequestError('invalid ID');

    const subtask = await prisma.subTask.findUnique({
      where: {
        id: value,
      },
      include: {
        task: {
          include: {
            column: {
              include: {
                board: true,
              },
            },
          },
        },
      },
    });

    if (!subtask) {
      throw new NotFoundError('not found');
    }

    if (subtask.task.column.board.belongsToId !== req.user.id) {
      throw new UnauthorizedError('not allowed');
    }
  }),
  ownershipErrorHandler,
];
