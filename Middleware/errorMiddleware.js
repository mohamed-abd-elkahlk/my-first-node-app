const glopalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "devlopment") {
    sendErrorDev(err, res);
  } else {
    sendErrorProdction(err, res);
  }
};

const sendErrorDev = (err, res) => {
  return res.status(400).json({
    status: err.status,
    error: err,
    messge: err.message,
    stack: err.stack,
  });
};
const sendErrorProdction = (err, res) => {
  return res.status(400).json({
    status: err.status,
    messge: err.message,
  });
};

module.exports = glopalError;
