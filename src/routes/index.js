const express = require("express");
const createError = require("http-errors");
const rootRoute = require("./root");
const userRoute = require("./user");
const centreRoute = require("./centre");
const candidateRoute = require("./candidate");

const router = express.Router();
router.use("/", rootRoute);
router.use("/user", userRoute);
router.use("/centre", centreRoute);
router.use("/candidate", candidateRoute);

router.use(async (req, res, next) => {
  //new Error("Requested resource you are looking not found");
  next(createError.NotFound("Requested resource you are looking not found"));
});

module.exports = router;
