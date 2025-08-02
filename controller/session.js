const asyncHandler = require("express-async-handler");
const Session = require("../models/Session");
const sessionCtrl = {
  sessions: asyncHandler(async (req, res) => {
    const sessions = await Session.find();
    if (!sessions) {
      throw new Error("No session found!");
    } else {
      res.json(sessions);
      console.log(sessions);
    }
  }),
  userSessions: asyncHandler(async (req, res) => {
    req.user._id;
    const sessions = await Session.findById({ user: req.user._id });
    if (!sessions.length) {
      res.status(404);
      throw new Error("No sessions found for this user.");
    }

    res.json(sessions);
    console.log(sessions);
  }),
  getUserSessionsById: asyncHandler(async (req, res) => {
    const sessionId = req.params.id;
    const session = await Session.findOne({
      _id: sessionId,
      user: req.user._id,
    });
    if (!session) {
      res.status(404);
      throw new Error("Session not found or not authorized");
    }

    res.json(session);
  }),
  publishSession: asyncHandler(async (req, res) => {
    const { title, tags, json_file_url, sessionId } = req.body;

    if (!title || !tags || !json_file_url) {
      res.status(400);
      throw new Error("Title, tags, and file URL are required.");
    }

    let session;

    if (sessionId) {
      // Try updating existing draft session to published
      session = await Session.findOne({
        _id: sessionId,
        user: req.user._id,
        status: "draft",
      });
      if (session) {
        session.title = title;
        session.tags = tags;
        session.json_file_url = json_file_url;
        session.status = "published";
        await session.save();
      }
    }

    // If no draft found or no sessionId, create new published session
    if (!session) {
      session = await Session.create({
        user: req.user._id,
        title,
        tags,
        json_file_url,
        status: "published",
      });
    }

    res.status(201).json({
      message: sessionId && session ? "Draft published" : "Session published",
      session,
    });
  }),

  saveDraft: asyncHandler(async (req, res) => {
    const { title, tags, json_file_url, sessionId } = req.body;

    if (!title || !tags || !json_file_url) {
      res.status(400);
      throw new Error("Title, tags, and file URL are required.");
    }

    let session;

    if (sessionId) {
      session = await Session.findOneAndUpdate(
        { _id: sessionId, user: req.user._id, status: "draft" },
        { title, tags, json_file_url },
        { new: true }
      );
    }

    // If no session found or no sessionId, create a new draft
    if (!session) {
      session = await Session.create({
        user: req.user._id,
        title,
        tags,
        json_file_url,
        status: "draft",
      });
    }

    res.status(201).json({
      message: sessionId && session ? "Draft updated" : "Draft created",
      session,
    });
  }),
};
