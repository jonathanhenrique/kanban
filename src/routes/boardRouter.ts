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

router.route('/').get(getAllBoards).post(validateBoardInput, createBoard);

router
  .route('/:id')
  .get(validateIdParam, getBoard)
  .patch(updateBoard)
  .delete(deleteBoard);

export default router;
