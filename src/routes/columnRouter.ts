import { Router } from 'express';
import {
  createColumn,
  deleteColumn,
  updateColumn,
  getColumn,
} from '../controllers/columnController';
import {
  validateColumnInput,
  validateColumnOwnership,
} from '../modules/validations';

const router = Router();
router.route('/').post(validateColumnInput as [], createColumn);
router
  .route('/:id')
  .get(validateColumnOwnership as [], getColumn)
  .patch(validateColumnOwnership as [], validateColumnInput as [], updateColumn)
  .delete(validateColumnOwnership as [], deleteColumn);

export default router;
