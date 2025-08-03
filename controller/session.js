const asyncHandler = require("express-async-handler");
const Session = require("../models/Session");
const fs = require("fs");
const path = require("path");

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
    const sessions = await Session.find({ user: req.user._id });
    if (!sessions || sessions.length === 0) {
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
    
    console.log("Inside publishSession");
    console.log("Request body:", req.body);
    console.log("User:", req.user);

    const { title, tags, sessionDetails, sessionId } = req.body;

    if (!title || !tags || !sessionDetails) {
      res.status(400);
      throw new Error("Title, tags, and session details are required.");
    }
        const uploadsDir = path.join(__dirname, "..", "uploads", "json");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Save JSON to file locally
    const fileName = `session_${Date.now()}.json`;
    const filePath = path.join(__dirname, "..", "uploads", "json", fileName);
    fs.writeFileSync(filePath, JSON.stringify(sessionDetails, null, 2));

    const fileUrl = `/uploads/json/${fileName}`; // Serve statically via Express

    let session;

    if (sessionId) {
      session = await Session.findOne({
        _id: sessionId,
        user: req.user._id,
        status: "draft",
      });
      if (session) {
        session.title = title;
        session.tags = tags;
        session.json_file_url = fileUrl;
        session.status = "published";
        await session.save();
      }
    }

    if (!session) {
      session = await Session.create({
        user: req.user._id,
        title,
        tags,
        json_file_url: fileUrl,
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
module.exports = sessionCtrl;
