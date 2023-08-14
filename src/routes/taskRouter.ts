import { Router } from 'express';
import { createTask } from '../controllers/task';

const router = Router();
router.route('/').post(createTask);

export default router;
