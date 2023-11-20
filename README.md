# Drag and Drop Kanban app

This is a simple yet challenging app that I created for practicing and to add it to my portfolio. That app is a drag and drop task manager app, where the user is able to create and delete boards, columns, tasks and subtasks. The drag and drop feature only applies to the tasks although I pretend to implement it to the columns and subtasks. The user also can mark and unmark the subtask as completed. For this app I decided to use the following stack (NodeJS, Express, PostgreSQL and React).

## Backend (PostgreSQL, Prisma, NodeJS and Express)

For database I decided to use PostgreSQL as I already have used non-relational database in previous projects and I wanted to practice relational database. On the server I used express-validator to validate the user inputs, and implemented the login using cookies to store a JSON Web Token.

Routes:

```jsx
// Routes
app.use('/api/boards', protectedRoute, boardRouter);
app.use('/api/columns', protectedRoute, columnRouter);
app.use('/api/tasks', protectedRoute, taskRouter);
app.use('/api/subtasks', protectedRoute, subtaskRouter);

//Register and Login
app.post('/api/register', validateRegisterInput as [], register);
app.post('/api/login', validateLoginInput as [], login);
app.post('/api/logout', logout);

// Not Found handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'not found' });
});

// Error Handler
app.use(errorHandlerMiddleware);
```

Protected Route Middleware:

```jsx
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
```

Task Router:

```jsx
const router = Router();
router
  .route('/')
  .post(validateTaskInput as [], createTask)
  .patch(validateTaskOrder as [], changeOrder)
  .put(validateTaskOrderColumn as [], changeOrderColumn);
router
  .route('/:id')
  .get(validateTaskOwnership as [], getTask)
  .patch(validateTaskOwnership as [], validateTaskUpdate as [], updateTask)
  .delete(validateTaskOwnership as [], deleteTask);

export default router;
```

Task order change handler:

```jsx
export async function changeOrder(req, res, next) {
  try {
    const { newPosition } = req.body;
    const selectedTask = req.task;

    if (selectedTask.order < newPosition) {
      await prisma.column.update({
        where: {
          id: selectedTask.column.id,
        },
        data: {
          tasks: {
            updateMany: {
              where: {
                order: {
                  gt: selectedTask.order,
                  lte: newPosition,
                },
              },
              data: {
                order: {
                  decrement: 1,
                },
              },
            },
          },
        },
        include: {
          tasks: true,
        },
      });
    } else if (selectedTask.order > newPosition) {
      await prisma.column.update({
        where: {
          id: selectedTask.column.id,
        },
        data: {
          tasks: {
            updateMany: {
              where: {
                order: {
                  lt: selectedTask.order,
                  gte: newPosition,
                },
              },
              data: {
                order: {
                  increment: 1,
                },
              },
            },
          },
        },
        include: {
          tasks: true,
        },
      });
    }

    await prisma.task.update({
      where: {
        id: selectedTask.id,
      },
      data: {
        order: newPosition,
      },
    });

    res.status(200);
    res.json({ message: 'success' });
  } catch (error) {
    next(error);
  }
}
```

Task Ownership validation:

```jsx
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
];
```

## Frontend (React)

React is my go to JavaScript library, for styling I am using Styled-components because I wanted to write some CSS instead of using a utility class framework like Tailwind CSS. The drag and drop is powered by the React Beautiful dnd library, it is easy to use but it was challenging to sync the board state with the database. Whenever the user drag and drop a task it will trigger the onDragEnd function and if something goes wrong when saving the changes to the database it will reset the board to keep it synced. For caching I am using Tanstack’s React-Query, all of the state mutations are updated manually using the setQueryData function from the Query Client. React Hot Toast has a promise notification that I am using to notify the user if the mutation is fulfilled or some error occurred.

The pattern that I am following, is to create a custom hook to each mutation to the database, the code below is from the useUpdateBoard custom hook that handles the user’s drag and drop interactions. The user is getting status notifications from the toast.promise().

```jsx
export function useUpdateBoard() {
  const { boardId } = useParams();
  const queryClient = useQueryClient();

  const { isLoading: isUpdatingPosition, mutate } = useMutation({
    mutationFn: ({
      taskId,
      newPosition,
      newColumnId = null,
    }: {
      taskId: string,
      newPosition: number,
      newColumnId?: null | string,
    }) => {
      if (!boardId) throw new Error('You need to select a board!');

      return toast.promise(changeOrder(taskId, newPosition, newColumnId), {
        loading: 'Saving your changes...',
        success: 'Your board was updated!',
        error: 'Something went wrong. Try again latter.',
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: [boardId, 'userBoard'],
      });
    },
  });

  return { isUpdatingPosition, mutate };
}
```

```jsx
export async function changeOrder(
  taskId: string,
  newPosition: number,
  newColumnId: string | null
) {
  const res = await fetch('/api/tasks/', {
    method: newColumnId ? 'PUT' : 'PATCH',
    body: JSON.stringify(
      newColumnId
        ? { taskId, newPosition, newColumnId }
        : { taskId, newPosition }
    ),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) {
    throw new Error('Something went wrong. Try again latter.');
  }
}
```
