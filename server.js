const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dbConfig = require("./app/config/db.config");
const db = require("./app/models");
const Role = db.role;

const app = express();

// Enable CORS with specific origin
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

// Connect to MongoDB
dbConfig.mongoose
  .connect(`mongodb+srv://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      w: "majority",
    }
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
    initial();
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); 
  });

// Initialize roles in the database
function initial() {
  Role.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        // If no roles exist, create initial roles
        createRole("user");
        createRole("moderator");
        createRole("admin");
      }
    })
    .catch((err) => {
      console.error("Error initializing roles:", err);
    });
}

// Helper function to create a role
function createRole(roleName) {
  new Role({ name: roleName })
    .save()
    .then(() => {
      console.log(`Added '${roleName}' to roles collection`);
    })
    .catch((err) => {
      console.error("Error adding role to roles collection:", err);
    });
}

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for cookie session
app.use(
  cookieSession({
    name: "ncc-cell-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to NCC Cell Report Database" });
});

// Routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/cell.routes")(app);


// Set port and start listening for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
