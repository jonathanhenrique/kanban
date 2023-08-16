import { Router } from 'express';
import {
  createTask,
  deleteTask,
  updateTask,
  changeColumn,
  changeOrder,
} from '../controllers/task';

const router = Router();
router.route('/').post(createTask).patch(changeOrder);
router.route('/:id').patch(updateTask).delete(deleteTask);

export default router;
