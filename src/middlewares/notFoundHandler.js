import createHttpError from 'http-errors';

export const notFoundHandler = (res, req, next) => {
  next(createHttpError.NotFound('Route not found'));
};
