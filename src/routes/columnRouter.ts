import { Router } from 'express';
import {
  createColumn,
  deleteColumn,
  updateColumn,
  getColumn,
} from '../controllers/columnController';

const router = Router();
router.route('/').post(createColumn);
router.route('/:id').get(getColumn).patch(updateColumn).delete(deleteColumn);

export default router;
