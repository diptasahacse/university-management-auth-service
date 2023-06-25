import { Router } from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';

const router = Router();
// Student

router.get('/:id', AdminController.getSingleAdmin);

router.get('/', AdminController.getAllAdmin);
router.delete('/:id', AdminController.deleteAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);

export const AdminRoutes = router;
