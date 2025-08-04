const mongoose = require("mongoose");
const publicSessionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("publicSession", publicSessionSchema);
