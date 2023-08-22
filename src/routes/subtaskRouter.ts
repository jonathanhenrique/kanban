import { Router } from 'express';
import { toggleCompleted } from '../controllers/subtaskController';

const router = Router();
router.route('/:id').patch(toggleCompleted);

export default router;
