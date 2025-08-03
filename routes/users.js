const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user");
const isAuthenticated=require("../middlewares/isAuth")

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/profile", isAuthenticated,userCtrl.profile);

module.exports = router;
