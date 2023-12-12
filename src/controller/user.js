const createError = require("http-errors");
// const asyncHandler = require("express-async-handler");
const service = require("../services/user");
const userSchema = require("../schemas/validation/user");
const user2Schema = require("../schemas/validation/user2");
const schema = require("../schemas/validation/test");
const loginSchema = require("../schemas/validation/login");
const jwtHelper = require("../helper/jwtHelper");
const randomKey = require("../helper/randomKeyHelper");
// const client = require("../helper/init_redis");

module.exports = {
  get: async (req, res, next) => {
    res.status(201).json({
      message: "User get is running",
    });
  },

  post: async (req, res, next) => {
    res.status(201).json({
      message: "User post is running",
    });
  },

  registerSingle: async (req, res, next) => {
    const result = await userSchema.unknown(true).validateAsync(req.body, {
      abortEarly: false,
    });
    const user = await service.registerSingle(result);

    //JWT Payload
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    //JWT Options
    const options = jwtHelper.getJwtOptions({
      audience: user.id,
      expiresIn: "5m",
      issuer: "Siyaram",
      jwtId: randomKey.numericUid(),
    });

    const accessToken = await jwtHelper.generateAccessToken({
      payload: payload,
      options: options,
    });
    const refreshToken = await jwtHelper.generateRefreshToken({
      payload: payload,
      options: {
        ...options,
        expiresIn: "8h",
        jwtid: randomKey.numericUid(),
      },
    });
    //Add refresh token to redis
    // client.set(user.id, refreshToken);
    res.status(201).json({
      status: "success",
      data: { id: user.id, email: user.email, accessToken, refreshToken },
    });
  },

  registerMultiple: async (req, res, next) => {
    const result = await user2Schema.validateAsync(req.body, {
      abortEarly: false,
    });

    const user = await service.registerMultiple(result);

    //JWT Payload
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    //JWT Options
    const options = jwtHelper.getJwtOptions({
      audience: user.id,
      expiresIn: "5m",
      issuer: "Siyaram",
      jwtId: randomKey.numericUid(),
    });

    const accessToken = await jwtHelper.generateAccessToken({
      payload: payload,
      options: options,
    });
    const refreshToken = await jwtHelper.generateRefreshToken({
      payload: payload,
      options: {
        ...options,
        expiresIn: "8h",
        jwtid: randomKey.numericUid(),
      },
    });
    // Add refresh token to redis
    client.set(user.id, refreshToken);
    res.status(201).json({
      status: "success",
      data: { id: user.id, email: user.email, accessToken, refreshToken },
      // validation: result,
    });
  },

  login: async (req, res, next) => {
    try {
      const result = await loginSchema.validateAsync(req.body);
      const user = await service.login(result);

      //JWT Payload
      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      //JWT Options
      const options = jwtHelper.getJwtOptions({
        audience: user.id,
        expiresIn: "30s",
        issuer: "Siyaram",
        jwtId: randomKey.numericUid(),
      });
      const accessToken = await jwtHelper.generateAccessToken({
        payload: payload,
        options: options,
      });
      const refreshToken = await jwtHelper.generateRefreshToken({
        payload: payload,
        options: {
          ...options,
          expiresIn: "8h",
          jwtid: randomKey.numericUid(),
        },
      });

      res.status(201).json({
        message: "success",
        data: {
          id: user.id,
          email: user.email,
          username: user.username,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      if (error.isJoi)
        next(createError.BadRequest("Invalid credentials provided."));
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    const { email } = req.body;
    if (!email) throw createError.BadRequest("email id field is required");
    const user = await service.deleteUser({ email: email });
    if (!user) throw createError.NotFound(`No data found for email ${email}`);
    res.status(201).json({
      status: "success",
      data: user,
    });
  },

  logout: async (req, res, next) => {
    res.status(201).json({
      message: "User logout is running",
    });
  },

  refreshToken: async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
      throw createError.BadRequest("Refresh token is must be provided.");
    const result = await jwtHelper.verifyToken({
      token: refreshToken,
      secretKey: process.env.REFRESH_TOKEN_KEY,
    });

    if (result.status === "failed")
      throw createError.Unauthorized(result.message);

    const {
      payload: { id },
    } = result;
    const user = await service.getUserById(id);

    //JWT Payload
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    //JWT Options
    const options = jwtHelper.getJwtOptions({
      audience: user.id,
      expiresIn: "30s",
      issuer: "Siyaram",
      jwtId: randomKey.numericUid(),
    });
    const accessToken = await jwtHelper.generateAccessToken({
      payload: payload,
      options: options,
    });
    const newRefreshToken = await jwtHelper.generateRefreshToken({
      payload: payload,
      options: {
        ...options,
        expiresIn: "8h",
        jwtid: randomKey.numericUid(),
      },
    });
    res.status(201).json({
      message: "User refresh token service is running",
      data: {
        id: user.id,
        email: user.email,
        accessToken,
        refreshToken: newRefreshToken,
      },
    });
  },

  schemaValidation: async (req, res, next) => {
    const result = await user2Schema.validateAsync(req.body, {
      abortEarly: false,
    });

    // const result = await schema.validateAsync(req.body, {
    //   abortEarly: false,
    // });

    res.status(201).json({
      status: "success",
      validation: result,
    });
  },
};
