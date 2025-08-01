const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user");
const isAuthenticated=require("../middlewares/isAuth")

router.post("/api/users/register", userCtrl.register);
router.post("/api/users/login", userCtrl.login);
router.get("/api/users/profile", isAuthenticated,userCtrl.profile);

module.exports = router;
