const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    tags: { type: [String], required: true },
    json_file_url: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Session", sessionSchema);
