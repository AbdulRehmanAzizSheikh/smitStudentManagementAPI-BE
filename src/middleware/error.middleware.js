const errorHandler = (err, req, res, next) => {
  const response = {
    status: false,
  };
  if (err.message) {
    response.message = err.message;
  }
  if (err.statusCode) {
    response.statusCode = err.statusCode;
  }
  if (err.status) {
    response.status = err.status;
  }
  res.status(err.statusCode).json(response);
};

export default errorHandler;
