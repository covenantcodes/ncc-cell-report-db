// const express = require('express')
// const CellController = require('../controllers/cell.controller')
// const router = express.Router();

// router.get('/', CellController.findAll);
// router.get('/:id', CellController.findOne);
// router.post('/', CellController.create);
// router.patch(':/id', CellController.update);
// router.delete('/:id', CellController.destroy);

// module.exports = router

const Cellcontroller = require("../controllers/cell.controller");

const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/cells/create", authJwt.verifyToken, Cellcontroller.create);

  app.get("/api/cells/:userId", authJwt.verifyToken, Cellcontroller.findByUserId);

  app.get("/api/cells/", authJwt.verifyToken, Cellcontroller.findAll);
};

