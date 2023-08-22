import { Router } from 'express';
import {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} from '../controllers/board';
import { validateBoardInput, validateBoardParam } from '../modules/validations';

const router = Router();

router
  .route('/')
  .get(getAllBoards)
  .post(validateBoardInput as [], createBoard);

router
  .route('/:id')
  .get(validateBoardParam as [], getBoard)
  .patch(validateBoardParam as [], validateBoardInput as [], updateBoard)
  .delete(validateBoardParam as [], deleteBoard);

export default router;
