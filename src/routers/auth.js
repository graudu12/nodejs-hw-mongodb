import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginSchema,
  registerSchema,
  reqResetPassSchema,
  resetPassSchema,
} from '../validation/auth.js';
import {
  loginCtrl,
  logoutCtrl,
  refreshCtrl,
  registerCtrl,
  reqResetPassCtrl,
  resetPassCtrl,
} from '../controllers/auth.js';
const router = express.Router();
router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerCtrl),
);
router.post('/login', validateBody(loginSchema), ctrlWrapper(loginCtrl));
router.post('/refresh', ctrlWrapper(refreshCtrl));
router.post('/logout', ctrlWrapper(logoutCtrl));
router.post(
  '/send-reset-email',
  validateBody(reqResetPassSchema),
  ctrlWrapper(reqResetPassCtrl),
);
router.post(
  '/reset-pwd',
  validateBody(resetPassSchema),
  ctrlWrapper(resetPassCtrl),
);
export default router;
