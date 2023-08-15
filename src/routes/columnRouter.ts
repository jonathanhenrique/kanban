import { Router } from 'express';
import {
  createColumn,
  deleteColumn,
  updateColumn,
} from '../controllers/column';

const router = Router();
router.route('/').post(createColumn);
router.route('/:id').patch(updateColumn).delete(deleteColumn);

export default router;
