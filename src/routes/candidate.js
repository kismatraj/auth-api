const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const candidate = require("../controller/candidate");

router.get("/", asyncHandler(candidate.get));
router.post("/", asyncHandler(candidate.post));
router.post("/single", asyncHandler(candidate.postSingle));
router.patch("/", asyncHandler(candidate.patch));
router.put("/", asyncHandler(candidate.put));
router.delete("/", asyncHandler(candidate.delete));

module.exports = router;
