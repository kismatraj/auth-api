const express = require("express");
const asyncHandler = require("express-async-handler");
const controller = require("../controller/user");
const jwtVerify = require("../middleware/jwtVerify");
const router = express.Router();

router.get("/", jwtVerify, asyncHandler(controller.get));
router.post("/", asyncHandler(controller.post));
router.post("/register/single", asyncHandler(controller.registerSingle));
router.post("/register/multiple", asyncHandler(controller.registerMultiple));
router.post("/schemaValidation", asyncHandler(controller.schemaValidation));
router.post("/login", asyncHandler(controller.login));
router.post("/refresh-token", asyncHandler(controller.refreshToken));
router.delete("/logout", asyncHandler(controller.logout));
router.delete("/user", asyncHandler(controller.deleteUser));

module.exports = router;
