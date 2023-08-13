import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { protectRoute } from './modules/auth';

// Import the Routes
import boardRouter from './routes/boardRouter';
import { createNewUser, signIn } from './controllers/user';

const app = express();

// Middlewares
app.use(cors()); //Enable CORS policy
app.use(morgan('dev')); //Show request and response logs to the console
app.use(express.json()); //Allow json on the body
app.use(express.urlencoded({ extended: true })); //Convert the URL to an object

// Routes
app.use('/api/boards', protectRoute, boardRouter);

//SignIn and SignUp
app.post('/signup', createNewUser);
app.post('/signin', signIn);

// Not Found handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'Something went wrong' });
});

export default app;
