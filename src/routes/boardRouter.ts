import { Router } from 'express';
import {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} from '../controllers/boardController';

const router = Router();

router.route('/').get(getAllBoards).post(createBoard);

router.route('/:id').get(getBoard).patch(updateBoard).delete(deleteBoard);

export default router;
