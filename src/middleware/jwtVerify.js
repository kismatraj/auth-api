const createError = require("http-errors");
const jwt = require("../helper/jwtHelper"); //require("jsonwebtoken");

const jwtVerify = async (req, res, next) => {
  const header = req.headers.authorization || req.headers.Authorization;

  if (!header || !header.startsWith("Bearer"))
    return next(createError.Unauthorized("Unauthorized"));
  const token = header.split(" ")[1];
  // jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, payload) => {
  //   if (err) {
  //     const message =
  //       err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
  //     next(createError.Unauthorized(message));
  //   }
  //   req.payload = payload;
  //   next();
  // });

  try {
    const result = await jwt.verifyToken({ token: token });
    if (result && result.status === "failed")
      return next(createError.Unauthorized("Unauthorized"));
    req.payload = result.payload;
    next();
  } catch (error) {
    next(createError.Unauthorized(error.message));
  }
};

module.exports = jwtVerify;
