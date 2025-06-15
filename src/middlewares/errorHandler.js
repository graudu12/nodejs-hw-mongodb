import { isHttpError } from 'http-errors';
export const errorHandler = (err, req, res, next) => {
  console.log('ErrorHandler:', err);

  if (isHttpError(err)) {
    res.status(err.status).json({
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
