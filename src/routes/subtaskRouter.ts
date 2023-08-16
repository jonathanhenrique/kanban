import { Router } from 'express';
import { toggleCompleted } from '../controllers/subtask';

const router = Router();
router.route('/:id').patch(toggleCompleted);

export default router;
