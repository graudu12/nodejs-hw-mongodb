import { isHttpError } from 'http-errors';
export const errorHandler = (err, req, res, next) => {
  console.log('ErrorHandler:', err);

  if (res.headersSent) {
    return next(err);
  }
  if (isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
