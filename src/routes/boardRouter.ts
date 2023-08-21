import { Router } from 'express';
import {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} from '../controllers/board';
import { validateBoardInput, validateIdParam } from '../modules/validations';

const router = Router();

router
  .route('/')
  .get(getAllBoards)
  .post(validateBoardInput as [], createBoard);

router
  .route('/:id')
  .get(validateIdParam as [], getBoard)
  .patch(validateIdParam as [], validateBoardInput as [], updateBoard)
  .delete(validateIdParam as [], deleteBoard);

export default router;
