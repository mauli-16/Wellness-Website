const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user");

router.post("/api/users/register", userCtrl.register);
router.post("/api/users/login", userCtrl.login);
router.post("/api/users/profile", userCtrl.profile);

module.exports = router;
