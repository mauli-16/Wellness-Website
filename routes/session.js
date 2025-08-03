const express = require("express");
const sessionRouter = express.Router();
const sessionCtrl = require("../controller/session");
const isAuthenticated=require("../middlewares/isAuth")

sessionRouter.get("/api/sessions/", sessionCtrl.sessions);

//protected routes
sessionRouter.get("/userSessions", isAuthenticated, sessionCtrl.userSessions);

sessionRouter.get("/:id", isAuthenticated, sessionCtrl.getUserSessionsById);

sessionRouter.post("/publish",isAuthenticated,  sessionCtrl.publishSession);

sessionRouter.post("/saveDraft", isAuthenticated,  sessionCtrl.saveDraft);


module.exports = sessionRouter;
