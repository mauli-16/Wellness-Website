const express = require("express");
const sessionRouter = express.Router();
const sessionCtrl = require("../controller/session");
const isAuthenticated=require("../middlewares/isAuth")
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // temp upload dir 
console.log("📁 Session router loaded");
sessionRouter.get("/", sessionCtrl.sessions);

//protected routes
sessionRouter.get("/userSessions", isAuthenticated, sessionCtrl.userSessions);
sessionRouter.post("/publish",isAuthenticated,  sessionCtrl.publishSession);





sessionRouter.post("/saveDraft", isAuthenticated,  sessionCtrl.saveDraft);
sessionRouter.get("/:id", isAuthenticated, sessionCtrl.getUserSessionsById);
sessionRouter.post("/uploadJSON", isAuthenticated,upload.single("file"), sessionCtrl.uploadJSON);
// Add this to your sessionRouter
sessionRouter.get("/test", (req, res) => {
  console.log("Test route hit!");
  res.json({ message: "Test successful" });
});

module.exports = sessionRouter;
