const errorHandler = (err, req, res, next) => {
  res.status(err.isJoi ? 422 : err.status || 500);
  res.send({
    error: {
      status: err.isJoi ? 422 : err.status || 500,
      message: err.message || "Something went wrong",
    },
  });
};

module.exports = errorHandler;
