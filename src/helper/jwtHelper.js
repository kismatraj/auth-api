const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  getJwtOptions: ({
    algorithm,
    audience,
    expiresIn,
    issuer,
    jwtId,
    subject,
  }) => {
    return {
      algorithm: algorithm ? algorithm : "HS512",
      audience: audience ? audience : "User of token",
      expiresIn: expiresIn ? expiresIn : "1m",
      issuer: issuer ? issuer : "Issuer of token",
      jwtid: jwtId ? jwtId : "jwtID",
      subject: subject ? subject : "SubjectForToken",
    };
  },

  signToken: async ({ payload, secretKey, options }) => {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secretKey, options, (err, token) => {
        if (err) {
          return reject(
            createError.InternalServerError(
              `Something went wrong ${err.message}`
            )
          );
        }
        resolve(token);
      });
    });
  },

  verifyToken: ({ token, secretKey }) => {
    if (!secretKey) secretKey = process.env.ACCESS_TOKEN_KEY;
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, payload) => {
        if (err) {
          const message =
            err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
          return reject({ status: "failed", message: message });
        }
        resolve({ status: "success", payload });
      });
    });
  },

  generateAccessToken: async function ({ payload, accessTokenKey, options }) {
    if (!accessTokenKey) accessTokenKey = process.env.ACCESS_TOKEN_KEY;
    if (!options) options = this.getJwtOptions();
    return this.signToken({
      payload: payload,
      secretKey: accessTokenKey,
      options: options,
    });
  },

  generateRefreshToken: async function ({ payload, refreshTokenKey, options }) {
    if (!refreshTokenKey) refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
    if (!options) options = this.getJwtOptions();
    return this.signToken({
      payload: payload,
      secretKey: refreshTokenKey,
      options: options,
    });
  },
};
