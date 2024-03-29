const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./user.model");
db.role = require("./role.model");
db.cell = require("./cell.model");
db.refreshToken = require("./refreshToken.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;