const CellModel = require("../models/cell.model");

// Create and Save a new Cell
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name && !req.body.type && !req.body.location) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Cell
  const cell = new CellModel({
    name: req.body.name,
    type: req.body.type,
    location: req.body.location,
    user: req.userId,
  });

  // Save Cell in the database
  try {
    const savedCell = await cell.save();
    res.status(201).json({
      message: "Cell created successfully",
      cell: savedCell,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Cell.",
    });
  }
};

// Retrieve all cells from the database
exports.findAll = async (req, res) => {
  try {
    const cell = await CellModel.find();
    res.status(200).json(cell);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// Find cells by userId
exports.findByUserId = (req, res) => {
  const { userId } = req.params;

  // Find cells by user ID
  CellModel.find({ user: userId })  // Assuming userId field in the Cell model
    .then(cells => {
      // Filter cells to include only those created by the specified user ID
      const userCells = cells.filter(cell => cell.user.toString() === userId);
      res.status(200).json(userCells);
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error" });
    });
};


//Find a single Cell with an id
exports.findOne = async (req, res) => {
  try {
    const cell = await CellModel.findById(req.params.id);
    res.status(200).json(cell);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Update a cell by id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to be updated can not be empty",
    });
  }

  const id = req.params.id;

  await CellModel.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cell not found.`,
        });
      } else {
        res.send({ message: "cell updated successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

//Delete a cell with the specified id in the request
exports.destroy = async (req, res) => {
  await CellModel.findOneAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cell not found.`,
        });
      } else {
        res.send({
          message: "Cell deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
