const asyncHandler = require("express-async-handler");
const Session = require("../models/Session");
const publicSessionSchema = require("../models/PublicSession");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const upload = multer({ dest: "uploads/" }); // temporary upload folder

const sessionCtrl = {
  sessions: asyncHandler(async (req, res) => {
    const publicSession = await publicSessionSchema.find();
    if (!publicSession) {
      throw new Error("No session found!");
    } else {
      res.json(publicSession);
      console.log(publicSession);
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
    console.log("clicked id ");

    const sessionId = req.params.id;
    console.log("Session ID:", sessionId);
    console.log("User ID from token:", req.user?._id);
    const session = await Session.findOne({
      _id: sessionId,
      user: req.user._id,
    });
    if (!session) {
      res.status(404);
      throw new Error("Session not found or not authorized");
    }

    let extraDetails = null;
    try {
      const jsonPath = path.join(__dirname, "..", session.json_file_url); // Adjust if URL is full or relative
      const fileContent = await fs.readFile(jsonPath, "utf-8");
      extraDetails = JSON.parse(fileContent);
    } catch (err) {
      console.error("Failed to read extra details from JSON:", err.message);
    }

    res.json({
      ...session.toObject(),
      extraDetails, // Attach parsed data from the uploaded JSON file
    });
  }),

  publishSession: asyncHandler(async (req, res) => {
    console.log("Inside publishSession");
    console.log("Request body:", req.body);
    console.log("User:", req.user);

    const { title, tags, jsonUrl, sessionId } = req.body;

    if (!title || !tags || !jsonUrl) {
      res.status(400);
      throw new Error("Title, tags, and jsonUrl are required.");
    }

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
        session.json_file_url = jsonUrl;
        session.status = "published";
        await session.save();
      }
    }

    if (!session) {
      session = await Session.create({
        user: req.user._id,
        title,
        tags,
        json_file_url: jsonUrl,
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
  uploadJSON: asyncHandler(async (req, res) => {
    const file = req.file;

    if (!file) {
      res.status(400);
      throw new Error("No file uploaded");
    }

    const originalName = file.originalname;
    const newFileName = `${Date.now()}_${originalName}`;
    const newPath = path.join(__dirname, "..", "uploads", newFileName);

    fs.rename(file.path, newPath, (err) => {
      if (err) {
        throw err;
      }

      const url = `/uploads/${newFileName}`; // Change this if using cloud storage

      res.status(200).json({ url });
    });
  }),
};
module.exports = sessionCtrl;
