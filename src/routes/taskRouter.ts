import { Router } from 'express';
import {
  createTask,
  deleteTask,
  updateTask,
  changeOrder,
  changeOrderColumn,
} from '../controllers/taskController';

const router = Router();
router.route('/').post(createTask).patch(changeOrder).put(changeOrderColumn);
router.route('/:id').patch(updateTask).delete(deleteTask);

export default router;
