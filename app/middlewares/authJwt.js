const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.session.tokem;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(tokem, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorised!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

