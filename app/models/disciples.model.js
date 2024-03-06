const mongoose = require("mongoose");

const disciplesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: {
    type: String,
    required: true,
    enum: ["Consolidation", "School of Leaders", "New Disciples"],
    default: "New Disciples",
  },

  ownerCell: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cell",
    required: true,
  },
});
