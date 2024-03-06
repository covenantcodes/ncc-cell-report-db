const Cellcontroller = require("../controllers/cell.controller");

const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/cells/create", authJwt.verifyToken, Cellcontroller.create);

  app.get(
    "/api/cells/:userId",
    authJwt.verifyToken,
    Cellcontroller.findByUserId
  );

  app.get("/api/cells/", authJwt.verifyToken, Cellcontroller.findAll);
};
