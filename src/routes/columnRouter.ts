import { Router } from 'express';
import { createColumn } from '../controllers/column';

const router = Router();
router.route('/').post(createColumn);

export default router;
