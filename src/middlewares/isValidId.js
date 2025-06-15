import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params.contactId)) {
    return next(
      createHttpError.BadRequest(
        `ID:${req.params.contactId} has incorrect format`,
      ),
    );
  }
  next();
};
