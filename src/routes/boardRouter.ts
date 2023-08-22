import { Router } from 'express';
import {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} from '../controllers/boardController';
import {
  validateBoardInput,
  validateBoardOwnership,
} from '../modules/validations';

const router = Router();

router
  .route('/')
  .get(getAllBoards)
  .post(validateBoardInput as [], createBoard);

router
  .route('/:id')
  .get(validateBoardOwnership as [], getBoard)
  .patch(validateBoardOwnership as [], validateBoardInput as [], updateBoard)
  .delete(validateBoardOwnership as [], deleteBoard);

export default router;
