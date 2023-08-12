import express from 'express';
import morgan from 'morgan';

// Import the Routes
import boardRouter from './routes/boardRouter';

const app = express();

// Middlewares
app.use(morgan('dev'));

// Routes
app.use('/api/boards', boardRouter);

// Not Found handler
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'Something went wrong' });
});

export default app;
