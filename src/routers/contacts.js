import express from 'express';

import {
  createContactCtrl,
  deleteContactCtrl,
  getAllContactsCtrl,
  getContactByIdCtrl,
  updateContactCtrl,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { contactSchema, contactUpdateSchema } from '../validation/contact.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();
router.get('/', ctrlWrapper(getAllContactsCtrl));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdCtrl));
router.post(
  '/',
  upload.single('photo'),
  validateBody(contactSchema),
  ctrlWrapper(createContactCtrl),
);
router.patch(
  '/:contactId',
  upload.single('photo'),
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(updateContactCtrl),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactCtrl));
export default router;
