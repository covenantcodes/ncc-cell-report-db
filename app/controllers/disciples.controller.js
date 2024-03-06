const DisciplesModel = require("../models/disciples.model");

// Create and Save new Disciples
exports.create = async (req, res) => {
  //Validate request
  if (!req.body.name || !req.body.level || !req.body.ownerCell) {
    res.status(400).send({ message: "Missing required fields" });
    return;
  }

  //Create a Disciple
  const disciple = new DisciplesModel({
    name: req.body.name,
    level: req.body.level,
    ownerCell: req.body.ownerCell,
  });

  //Save Disciple in the database
  try {
    const savedDisciple = await disciple.save();
    res.status(201).json({
      message: "Disciple created successfully",
      data: savedDisciple,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Disciple",
    });
  }
};

// Retrieve and return all Disciples from the database
exports.findAll = async (req, res) => {
  try {
    const disciples = await DisciplesModel.find();
    res.status(200).json(disciples);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find disciples by ownerCell
exports.findByOwnerCell = async (req, res) => {
  const { ownerCellId } = req.params;

  //Find disciples by ownerCell ID
  try {
    const disciples = await DisciplesModel.find({ ownerCell: ownerCellId });
    res.status(200).json(disciples);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Find a single Disciple with an id
exports.findOne = async (req, res) => {
  try {
    const disciple = await DisciplesModel.findById(req.params.id);
    res.status(200).json(disciple);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Update a Disciple identified by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to be can not be empty",
    });
  }

  const id = req.params.id;

  await DisciplesModel.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot find disciple!",
        });
      } else {
        res.send({
          message: "Disciple updated successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Delete a Disciple with the specified id in the request
exports.destroy = async (req, res) => {
    await DisciplesModel.findOneAndRemove(req.params.id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Disciple not found.`,
          });
        } else {
          res.send({
            message: "Disciple deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  };