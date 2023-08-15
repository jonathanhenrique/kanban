import { Router } from 'express';
import { createTask, deleteTask, updateTask } from '../controllers/task';

const router = Router();
router.route('/').post(createTask);
router.route('/:id').patch(updateTask).delete(deleteTask);

export default router;
