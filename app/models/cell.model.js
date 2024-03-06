const mongoose = require("mongoose");

const cellSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Generic", "Bible Club"], required: true },
  location: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Cell", cellSchema);
