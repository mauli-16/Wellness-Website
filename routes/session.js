const express = require("express");
const sessionRouter = express.Router();
const sessionCtrl = require("../controller/session");
const isAuthenticated=require("../middlewares/isAuth")

sessionRouter.get("/api/sessions/", sessionCtrl.sessions);

//protected routes
sessionRouter.get("/api/sessions/userSessions", isAuthenticated, sessionCtrl.userSessions);

sessionRouter.get("/api/sessions/:id", isAuthenticated, sessionCtrl.getUserSessionsById);

sessionRouter.post("/api/sessions/publish",isAuthenticated,  sessionCtrl.publishSession);

sessionRouter.post("/api/sessions/saveDraft", isAuthenticated,  sessionCtrl.saveDraft);


module.exports = sessionRouter;
