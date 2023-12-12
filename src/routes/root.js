const express = require("express");
const router = express.Router();
const root = require("../controller/root");

router.get("/", root.get);
router.get("/compression", root.compression);
router.post("/", root.post);
router.patch("/", root.patch);
router.put("/", root.put);
router.delete("/", root.delete);

module.exports = router;
