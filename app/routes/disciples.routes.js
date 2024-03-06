const DiscipleController = require("../controllers/disciples.controller");

module.exports = function (app) {
  app.post("/api/disciples/create", DiscipleController.create);
  app.get("/api/disciples/:ownerCellId", DiscipleController.findByOwnerCell);
  app.get("/api/disciples/", DiscipleController.findAll);
  app.get("/api/disciples/:id", DiscipleController.findOne);
  app.put("/api/disciples/:id", DiscipleController.update);
  app.delete("/api/disciples/:id", DiscipleController.destroy);
};
