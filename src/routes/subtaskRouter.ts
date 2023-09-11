import { Router } from 'express';
import { toggleCompleted } from '../controllers/subtaskController';
import {
  validateSubtaskToggle,
  validateSubtaskOwnership,
} from '../modules/validations';

const router = Router();
router
  .route('/:id')
  .patch(
    validateSubtaskOwnership as [],
    validateSubtaskToggle as [],
    toggleCompleted
  );

export default router;
