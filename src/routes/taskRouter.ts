import { Router } from 'express';
import {
  createTask,
  deleteTask,
  updateTask,
  changeOrder,
  changeOrderColumn,
  getTask,
} from '../controllers/taskController';
import {
  validateTaskInput,
  validateTaskOwnership,
  validateTaskUpdate,
  validateTaskOrder,
  validateTaskOrderColumn,
} from '../modules/validations';

const router = Router();
router
  .route('/')
  .post(validateTaskInput as [], createTask)
  .patch(validateTaskOrder as [], changeOrder)
  .put(validateTaskOrderColumn as [], changeOrderColumn);
router
  .route('/:id')
  .get(validateTaskOwnership as [], getTask)
  .patch(validateTaskOwnership as [], validateTaskUpdate as [], updateTask)
  .delete(validateTaskOwnership as [], deleteTask);

export default router;
