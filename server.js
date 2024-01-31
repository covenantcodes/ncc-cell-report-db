const express = require("express")
const cors = require("cors")
const cookieSession = require("cookie-session")

const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urle
app.use(express.urlencoded({extenede: true}));

app.use(
    cookieSession({
        name:"ncc-cell-session",
        keys: ["COOKIE_SECRET"],
        httpOnly: true
    })
);

//simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to NCC Cell Report Database"});
});

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})