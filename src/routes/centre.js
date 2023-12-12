const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const centre = require("../controller/centre");

router.get("/", asyncHandler(centre.get));
router.post("/import", asyncHandler(centre.import));
router.patch("/", asyncHandler(centre.patch));
router.put("/", asyncHandler(centre.put));
router.delete("/", asyncHandler(centre.delete));

module.exports = router;
