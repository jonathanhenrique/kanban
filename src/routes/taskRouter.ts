import { Router } from 'express';
import {
  createTask,
  deleteTask,
  updateTask,
  changeColumn,
} from '../controllers/task';

const router = Router();
router.route('/').post(createTask).patch(changeColumn);
router.route('/:id').patch(updateTask).delete(deleteTask);

export default router;
