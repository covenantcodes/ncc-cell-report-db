const mongoose = require("mongoose");
const db = require("../models");
const Users = db.user;

exports.changeUserRole = async (req, res) => {
  const { userId } = req.params;
  const { roles } = req.body;

  try {
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    // Find the user by ID
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate roles array
    if (!Array.isArray(roles) || roles.length === 0) {
      return res.status(400).json({ message: "Invalid roles data" });
    }

    // Update the user roles with role IDs
    user.roles = roles.map((roleId) => mongoose.Types.ObjectId(roleId));

    await user.save();

    return res.status(200).json({ message: "User roles updated successfully" });
  } catch (error) {
    console.error("Error updating user's role: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
