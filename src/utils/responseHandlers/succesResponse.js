export const successResponse = (
  res,
  statusCode,
  status,
  message,
  data,
  token,
) => {
  const successData = {};
  if (status) {
    successData.status = status;
  }
  if (message) {
    successData.message = message;
  }
  if (data) {
    successData.data = data;
  }
  if (token) {
    successData.token = token;
  }
  return res.status(statusCode || 200).json(successData);
};
