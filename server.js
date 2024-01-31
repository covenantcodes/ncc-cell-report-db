const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbconfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
    initial();
  })

  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count == 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("Added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("Added a 'Moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("Added an 'admin' to roles collection");
      });
    }
  });
}
//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urle
app.use(express.urlencoded({ extenede: true }));

app.use(
  cookieSession({
    name: "ncc-cell-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to NCC Cell Report Database" });
});

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

