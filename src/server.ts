import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { protectedRoute } from './modules/auth';
import { errorHandlerMiddleware } from './modules/errors';
import {
  validateLoginInput,
  validateRegisterInput,
} from './modules/validations';

// Import the Routes
import subtaskRouter from './routes/subtaskRouter';
import taskRouter from './routes/taskRouter';
import columnRouter from './routes/columnRouter';
import boardRouter from './routes/boardRouter';
import { register, login } from './controllers/user';

const app = express();

// Middleware
app.use(cors()); //Enable CORS policy
app.use(morgan('dev')); //Show request and response logs to the console
app.use(express.json()); //Allow json on the body
app.use(express.urlencoded({ extended: true })); //Convert the URL to an object
app.use(cookieParser());

// Routes
app.use('/api/boards', protectedRoute, boardRouter);
app.use('/api/columns', protectedRoute, columnRouter);
app.use('/api/tasks', protectedRoute, taskRouter);
app.use('/api/subtasks', protectedRoute, subtaskRouter);

//Register and Login
app.post('/register', validateRegisterInput as [], register);
app.post('/login', validateLoginInput as [], login);

// Not Found handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'not found' });
});

// Error Handler
app.use(errorHandlerMiddleware);

export default app;
